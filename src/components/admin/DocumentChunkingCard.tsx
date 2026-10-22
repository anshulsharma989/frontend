import { Link } from "react-router-dom";
import type { DocumentInfo } from "../../types";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { SectionHeader } from "../ui/SectionHeader";

const STATUS_TONE: Record<DocumentInfo["status"], "neutral" | "secondary" | "tertiary" | "error"> = {
  queued: "neutral",
  processing: "secondary",
  ready: "tertiary",
  failed: "error",
};

const STATUS_ICON: Record<DocumentInfo["status"], string> = {
  queued: "schedule",
  processing: "autorenew",
  ready: "check_circle",
  failed: "error",
};

export function DocumentChunkingCard({ documents }: { documents: DocumentInfo[] }) {
  const processing = documents.filter((d) => d.status === "queued" || d.status === "processing").length;

  return (
    <Card className="flex flex-col gap-space-sm">
      <SectionHeader
        icon="neurology"
        title="Curriculum Vector Chunking"
        trailing={<span className="font-code text-xs text-secondary">{documents.length} documents</span>}
      />
      {processing > 0 && (
        <p className="text-sm text-secondary">
          {processing} document{processing === 1 ? "" : "s"} still ingesting…
        </p>
      )}
      <div className="flex flex-col gap-2">
        {documents.slice(0, 5).map((doc) => (
          <div key={doc.id} className="flex items-center justify-between gap-space-sm rounded-lg bg-surface-container p-3">
            <div className="flex min-w-0 items-center gap-2">
              <Icon name="description" className="shrink-0 text-[20px] text-primary" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-on-surface">{doc.title}</p>
                <p className="truncate text-xs text-on-surface-variant">
                  {doc.grade_name}
                  {doc.subject_name ? ` · ${doc.subject_name}` : ""}
                </p>
              </div>
            </div>
            <Badge tone={STATUS_TONE[doc.status]} className="shrink-0">
              <Icon name={STATUS_ICON[doc.status]} className="text-[14px]" />
              {doc.status}
            </Badge>
          </div>
        ))}
        {documents.length === 0 && <p className="text-sm text-on-surface-variant">No books uploaded yet.</p>}
      </div>
      <Link to="/admin/catalog" className="self-start text-sm font-medium text-secondary hover:underline">
        Upload a book →
      </Link>
    </Card>
  );
}
