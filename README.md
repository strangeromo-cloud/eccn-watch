# Vendor Export Reference

NVIDIA + AMD 出口管制分类（ECCN / HTS）的统一参考站。每个 Tab 直接抓自厂商官方源，并提供可下载的 Excel。

> ⚠️ 仅快照参考——交易决策前请到官方源核对。本站不能替代法律或合规建议。

## 功能

- **NVIDIA 标签**：从 `api-prod.nvidia.com/services/eccn/v1/getECCN` 抓取的 1267 条产品分类
- **AMD 标签**：从 `product-master.pdf` 解析的 9629 条产品分类
- **下载 Excel** — 每家一份多 sheet 工作簿（About / All Parts / ECCN Distribution）
- **Refresh now** — 实时从厂商官网重新抓取，60 秒节流（客户端 + 服务端双层）
- **中英双语** — 顶部右上角切换

## 技术栈

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- `pdfjs-dist` — 解析 AMD PDF
- `exceljs` — 生成 XLSX
- 中英双语用轻量自建 Context（`lib/i18n/`）

## 路由

| 路径 | 类型 | 说明 |
|---|---|---|
| `/` | Static | 单页主体：tab 切换 + 下载 + 刷新 + 分布图 |
| `/api/refresh/[vendor]?type=meta` | Dynamic | 拉新数据返回 meta JSON（vendor=nvidia / amd） |
| `/api/refresh/[vendor]?type=xlsx` | Dynamic | 拉新数据返回二进制 XLSX |

API 路由内置 60s in-memory cache + in-flight dedup，防止滥用上游。

## 本地运行

```bash
npm install
npm run dev
# 打开 http://localhost:3000
```

## 刷新静态快照（可选）

页面初始数据来自 `data/{nvidia,amd}-eccn-meta.json` 和 `public/{nvidia,amd}-eccn.xlsx`，是构建时写入的快照。运行时按 Refresh 按钮会即时拉新数据并覆盖显示。

如果想在 Git 里把快照升级到更新版本：

```bash
npm run data:nvidia   # 重新抓 NVIDIA → 写 data/ 和 public/
npm run data:amd      # 重新抓 AMD（约 30 秒，4 MB PDF + 198 页）
git add data/ public/
git commit -m "Refresh vendor snapshots"
```

需要 Python 3 + `openpyxl` + `pdfplumber`：
```bash
pip3 install openpyxl pdfplumber
```

## 部署到 Zeabur

1. 把这个仓库推到 GitHub
2. 在 https://zeabur.com 新建 Project → Add Service → Git → 选这个仓库
3. Zeabur 自动识别 Next.js，运行 `npm install && npm run build && npm start`
4. **Networking → Generate Domain** 拿到 `xxx.zeabur.app`
5. 想绑自定义域名也在 Networking 里加

注意：API 路由 (`/api/refresh/[vendor]`) 是动态路由，会跑在 Node 服务端。Zeabur 默认就支持，不需要额外配置。

## 数据来源

| 厂商 | 源 | 频率 |
|---|---|---|
| NVIDIA | https://www.nvidia.com/en-us/about-nvidia/company-policies/export-regulations/ | 实时 API |
| AMD | https://www.amd.com/en/legal/compliance/trade-compliance.html → product-master.pdf | 通常每月一次 PDF 更新 |

每条数据都标注了快照时间，UI 上"Snapshot"行显示。
