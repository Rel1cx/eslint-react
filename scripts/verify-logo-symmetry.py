#!/usr/bin/env python3
"""Verify that the artwork in assets/logo.svg has 120° rotational symmetry.

The script:
  1. Reads every <path> from the SVG.
  2. Densely samples points along each path.
  3. Rotates the sample by 120° (and 240°) around the viewBox center.
  4. For every rotated path, finds the original path that best matches it
     and reports the symmetric Hausdorff distance in user-space pixels.
  5. Exits with code 0 only if every path has a counterpart within TOLERANCE.

Dependency:
    pip install svgpathtools numpy

Usage:
    python scripts/verify-logo-symmetry.py [path/to/logo.svg]
"""

from __future__ import annotations

import math
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

try:
    import numpy as np
    from svgpathtools import parse_path
except ImportError as exc:  # pragma: no cover
    sys.exit(f"Missing dependency: {exc.name}.\nInstall with:  pip install svgpathtools numpy")


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
DEFAULT_SVG = Path(__file__).resolve().parent.parent / "assets" / "logo.svg"
SAMPLES_PER_PATH = 600  # points per path (denser => more accurate)
TOLERANCE_PX = 0.5  # max allowed Hausdorff distance, in SVG pixels
ANGLES_DEG = (120.0, 240.0)  # rotations we expect to be symmetries


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def parse_viewbox_center(root: ET.Element) -> tuple[float, float]:
    vb = root.get("viewBox")
    if vb is None:
        # Fall back to width / height
        w = float(root.get("width", "0"))
        h = float(root.get("height", "0"))
        return w / 2.0, h / 2.0
    parts = [float(x) for x in re.split(r"[\s,]+", vb.strip())]
    min_x, min_y, w, h = parts
    return min_x + w / 2.0, min_y + h / 2.0


def load_paths(svg_file: Path):
    tree = ET.parse(svg_file)
    root = tree.getroot()
    ns = {"svg": "http://www.w3.org/2000/svg"}
    paths = []
    for elem in root.findall(".//svg:path", ns):
        d = elem.get("d")
        if d:
            paths.append((d.strip(), parse_path(d)))
    cx, cy = parse_viewbox_center(root)
    return paths, (cx, cy)


def sample_points(path, n: int) -> np.ndarray:
    """Sample n points roughly evenly in t along a (possibly multi-subpath) path."""
    ts = np.linspace(0.0, 1.0, n)
    pts = np.empty((n, 2), dtype=float)
    for i, t in enumerate(ts):
        z = path.point(float(t))
        pts[i, 0] = z.real
        pts[i, 1] = z.imag
    return pts


def rotate(points: np.ndarray, angle_deg: float, center: tuple[float, float]) -> np.ndarray:
    rad = math.radians(angle_deg)
    c, s = math.cos(rad), math.sin(rad)
    R = np.array([[c, -s], [s, c]])
    cx, cy = center
    centered = points - np.array([cx, cy])
    return centered @ R.T + np.array([cx, cy])


def directed_hausdorff(a: np.ndarray, b: np.ndarray) -> float:
    """Largest of the nearest-neighbour distances from a to b (vectorised)."""
    # |a|x|b| distance matrix; fine for our sample counts (~600 each).
    diff = a[:, None, :] - b[None, :, :]
    d2 = np.einsum("ijk,ijk->ij", diff, diff)
    nearest = d2.min(axis=1)
    return math.sqrt(float(nearest.max()))


def hausdorff(a: np.ndarray, b: np.ndarray) -> float:
    return max(directed_hausdorff(a, b), directed_hausdorff(b, a))


def short_d(d: str, n: int = 48) -> str:
    return d if len(d) <= n else d[: n - 1] + "…"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main(argv: list[str]) -> int:
    svg_path = Path(argv[1]) if len(argv) > 1 else DEFAULT_SVG
    if not svg_path.is_file():
        sys.exit(f"SVG file not found: {svg_path}")

    paths, center = load_paths(svg_path)
    print(f"File   : {svg_path}")
    print(f"Center : ({center[0]:.3f}, {center[1]:.3f})")
    print(f"Paths  : {len(paths)}  (samples per path: {SAMPLES_PER_PATH})")
    print(f"Tol.   : {TOLERANCE_PX} px (Hausdorff)\n")

    samples = [sample_points(p, SAMPLES_PER_PATH) for _, p in paths]

    overall_ok = True
    for angle in ANGLES_DEG:
        print(f"── Rotation: {angle:.0f}° ──")
        for i, pts in enumerate(samples):
            rotated = rotate(pts, angle, center)
            best_j, best_d = -1, float("inf")
            for j, other in enumerate(samples):
                d = hausdorff(rotated, other)
                if d < best_d:
                    best_d, best_j = d, j
            ok = best_d <= TOLERANCE_PX
            overall_ok &= ok
            tag = "OK  " if ok else "FAIL"
            print(f"  [{tag}] path {i} ({short_d(paths[i][0])})\n         → best match: path {best_j}   Hausdorff = {best_d:.4f} px")
        print()

    print("=" * 60)
    if overall_ok:
        print(f"✔  All paths exhibit 120° rotational symmetry (≤ {TOLERANCE_PX} px).")
        return 0
    print(f"✘  Some paths deviate by more than {TOLERANCE_PX} px from 120° symmetry. See FAIL rows above.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
