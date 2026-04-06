"use client";

import { useState } from "react";
import { uploadAdminAsset } from "@/app/admin/actions/upload";

export type BlobUploadFieldProps = {
  name: string;
  label: string;
  initialUrl?: string | null;
  /**
   * File picker filter. Defaults: images + svg for kind "image", video types for kind "video".
   */
  accept?: string;
  /** "image" (default): image preview + image accept. "video": video preview + video accept. */
  kind?: "image" | "video";
  /** Shown under the main label (e.g. how URL + upload relate to the database). */
  description?: string;
  /** HTML required on the URL field (e.g. background video must be set). */
  required?: boolean;
};

const DEFAULT_IMAGE_ACCEPT = "image/*,.svg";
const DEFAULT_VIDEO_ACCEPT = "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov";

function looksLikeVideoUrl(url: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url) || url.includes("/video");
}

export function BlobUploadField({
  name,
  label,
  initialUrl,
  accept: acceptProp,
  kind = "image",
  description =
    "The value in the URL field is what gets stored in the database. Paste any public link, or upload a file — the upload returns a URL and fills the field; then save the form.",
  required = false,
}: BlobUploadFieldProps) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [status, setStatus] = useState("");

  const accept = acceptProp ?? (kind === "video" ? DEFAULT_VIDEO_ACCEPT : DEFAULT_IMAGE_ACCEPT);
  const showVideoPreview = kind === "video" || (kind === "image" && url.length > 0 && looksLikeVideoUrl(url));

  return (
    <div className="admin-field admin-media-field">
      <label className="admin-media-field-label">{label}</label>
      {description && <p className="admin-media-field-desc">{description}</p>}

      <div className="admin-media-block">
        <span className="admin-media-sublabel">URL (stored in database)</span>
        <input
          type="text"
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={kind === "video" ? "https://… (video URL)" : "https://… (image URL)"}
          className="admin-input"
          autoComplete="off"
          required={required}
        />
      </div>

      <div className="admin-media-block">
        <span className="admin-media-sublabel">Upload file</span>
        <input
          type="file"
          accept={accept}
          className="admin-file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setStatus("Uploading…");
            const fd = new FormData();
            fd.set("file", file);
            const r = await uploadAdminAsset(fd);
            if (r.ok) {
              setUrl(r.url);
              setStatus("Uploaded — URL filled above. Save the form to persist.");
            } else {
              setStatus(r.error);
            }
            e.target.value = "";
          }}
        />
      </div>

      {status && <p className={status.startsWith("Uploading") || status.includes("persist") ? "admin-hint" : "admin-error"}>{status}</p>}

      {url ? (
        <div className="admin-media-preview-wrap">
          <span className="admin-media-sublabel">Preview</span>
          {showVideoPreview ? (
            <video key={url} className="admin-media-preview admin-media-preview-video" src={url} controls muted playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- admin-only preview of arbitrary URLs
            <img className="admin-media-preview" src={url} alt="" />
          )}
        </div>
      ) : null}
    </div>
  );
}
