import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";

interface ComingSoonProps {
  title: string;
  screen?: string;
}

/** Placeholder for routes whose screen hasn't been converted from the Stitch export yet. */
export function ComingSoon({ title, screen }: ComingSoonProps) {
  return (
    <Card className="flex flex-col items-center gap-space-sm py-space-xl text-center">
      <Icon name="construction" className="text-4xl text-on-surface-variant" />
      <h2 className="font-headline text-lg font-semibold text-on-surface">{title}</h2>
      <p className="max-w-md text-sm text-on-surface-variant">
        This screen hasn&apos;t been built yet.
        {screen && (
          <>
            {" "}
            See <code className="rounded bg-surface-container px-1.5 py-0.5">{screen}</code> and{" "}
            <code className="rounded bg-surface-container px-1.5 py-0.5">frontend/SCREENS.md</code> for status.
          </>
        )}
      </p>
    </Card>
  );
}
