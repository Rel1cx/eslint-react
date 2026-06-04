#!/usr/bin/env python3
"""Regenerate every raster asset under apps/website/public from assets/logo.svg.

Uses `resvg` for SVG → PNG rasterization (geometricPrecision), Pillow for
multi-resolution ICO assembly, and macOS `iconutil` for ICNS assembly.

The file `apps/website/public/sponsors.svg` is explicitly NOT touched.

Usage:
    uv run --with pillow scripts/generate-website-icons.py
"""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Missing dependency: pillow.  uv run --with pillow scripts/generate-website-icons.py")

ROOT = Path(__file__).resolve().parent.parent
SRC_SVG = ROOT / "assets" / "logo.svg"
OUT_DIR = ROOT / "apps" / "website" / "public"

# (filename, pixel size) — taken from the existing files so dimensions don't drift.
PNG_TARGETS: list[tuple[str, int]] = [
    ("32x32.png", 32),
    ("64x64.png", 64),
    ("128x128.png", 128),
    ("128x128@2x.png", 256),
    ("Square30x30Logo.png", 30),
    ("Square44x44Logo.png", 44),
    ("Square71x71Logo.png", 71),
    ("Square89x89Logo.png", 89),
    ("Square107x107Logo.png", 107),
    ("Square142x142Logo.png", 142),
    ("Square150x150Logo.png", 150),
    ("Square284x284Logo.png", 284),
    ("Square310x310Logo.png", 310),
    ("StoreLogo.png", 50),
    ("icon.png", 512),
    ("logo.png", 1024),
    ("og.png", 512),
]

ICO_SIZES = [16, 24, 32, 48, 64, 256]

# Pairs: (filename in .iconset, pixel size)
ICNS_ENTRIES = [
    ("icon_16x16.png", 16),
    ("icon_16x16@2x.png", 32),
    ("icon_32x32.png", 32),
    ("icon_32x32@2x.png", 64),
    ("icon_128x128.png", 128),
    ("icon_128x128@2x.png", 256),
    ("icon_256x256.png", 256),
    ("icon_256x256@2x.png", 512),
    ("icon_512x512.png", 512),
    ("icon_512x512@2x.png", 1024),
]


def require(cmd: str) -> str:
    path = shutil.which(cmd)
    if not path:
        sys.exit(f"Required tool not on PATH: {cmd}")
    return path


def render_png(svg: Path, dst: Path, size: int) -> None:
    """Rasterize `svg` to a square `size`×`size` PNG via resvg."""
    subprocess.run(
        [
            RESVG,
            "--width",
            str(size),
            "--height",
            str(size),
            "--image-rendering",
            "high-quality",
            str(svg),
            str(dst),
        ],
        check=True,
    )


def build_ico(svg: Path, dst: Path, sizes: list[int]) -> None:
    """Render each size with resvg, then bundle into a multi-image ICO."""
    with tempfile.TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir)
        layer_paths = []
        for s in sizes:
            p = tmp / f"{s}.png"
            render_png(svg, p, s)
            layer_paths.append(p)
        # Use the largest layer as the base; Pillow's `sizes=` argument
        # produces all the sub-icons by downscaling, which would lose the
        # high-quality resvg renders. Instead we open each PNG and write
        # the ICO container ourselves.
        biggest = Image.open(layer_paths[-1]).convert("RGBA")
        biggest.save(
            dst,
            format="ICO",
            sizes=[(s, s) for s in sizes],
            append_images=[Image.open(p).convert("RGBA") for p in layer_paths[:-1]],
        )


def build_icns(svg: Path, dst: Path) -> None:
    """Render Apple's standard icon set and run `iconutil` to produce ICNS."""
    iconutil = require("iconutil")
    with tempfile.TemporaryDirectory() as tmpdir:
        iconset = Path(tmpdir) / "icon.iconset"
        iconset.mkdir()
        for name, size in ICNS_ENTRIES:
            render_png(svg, iconset / name, size)
        subprocess.run(
            [iconutil, "-c", "icns", "-o", str(dst), str(iconset)],
            check=True,
        )


def main() -> int:
    if not SRC_SVG.is_file():
        sys.exit(f"Source SVG not found: {SRC_SVG}")
    global RESVG
    RESVG = require("resvg")

    # 1. logo.svg — copy of the canonical source.
    shutil.copyfile(SRC_SVG, OUT_DIR / "logo.svg")
    print(f"  ✓ logo.svg                       (copied)")

    # 2. Every PNG, rendered at its exact target size.
    for name, size in PNG_TARGETS:
        render_png(SRC_SVG, OUT_DIR / name, size)
        print(f"  ✓ {name:32} {size}x{size}")

    # 3. Multi-resolution icon.ico and identical favicon.ico.
    build_ico(SRC_SVG, OUT_DIR / "icon.ico", ICO_SIZES)
    print(f"  ✓ icon.ico                       sizes={ICO_SIZES}")
    shutil.copyfile(OUT_DIR / "icon.ico", OUT_DIR / "favicon.ico")
    print(f"  ✓ favicon.ico                    sizes={ICO_SIZES}")

    # 4. macOS icon.icns.
    build_icns(SRC_SVG, OUT_DIR / "icon.icns")
    print(f"  ✓ icon.icns                      (iconset: 16…1024)")

    print("\nDone. (apps/website/public/sponsors.svg was left untouched.)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
