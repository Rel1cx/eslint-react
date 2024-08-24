export type EREffectPhaseKind = "cleanup" | "setup";
export type ERLifecyclePhaseKind = "mount" | "unmount";

export type ERPhaseKind = EREffectPhaseKind | ERLifecyclePhaseKind;
