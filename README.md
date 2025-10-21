# ImageDeduper — Frontend

Frontend for ImageDeduper. Live app below; backend is linked in Overview.




**Live:** https://imagededuper.netlify.app

---

## Overview

A Next.js + TypeScript frontend for the ImageDeduper project. It lets you:
- Upload images
- Trigger backend processing (group near-duplicates and pick the most aesthetic per group)
- See progress and download the selected images as a ZIP

Backend repo: https://github.com/basilbenny1002/ImageDeduper-backend

## Quick start

Requirements:
- Node.js 18+
- pnpm (preferred) or npm/yarn

```powershell
# Clone and install
git clone https://github.com/basilbenny1002/image-selector-front-end.git
cd image-selector-front-end
pnpm install

# Create .env.local
@"
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_ENABLE_BACKEND_CHECK=true
NEXT_PUBLIC_UPLOAD_LIMIT_MB=250
"@ | Out-File -Encoding utf8 .env.local

# Run
pnpm dev
```

Open http://localhost:3000

## Environment variables

- `NEXT_PUBLIC_BACKEND_URL` — FastAPI server URL (default `http://127.0.0.1:8000`)
- `NEXT_PUBLIC_ENABLE_BACKEND_CHECK` — `true` to check backend health status before loading
- `NEXT_PUBLIC_UPLOAD_LIMIT_MB` — Max upload size (MB)

## Build

```powershell
pnpm build
pnpm start
```


