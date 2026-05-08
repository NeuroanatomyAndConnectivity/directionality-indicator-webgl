import { runApp } from "./app";
import { showBanner } from "./gfx/view";

const container = document.getElementById("app");
if (!container) {
  showBanner("Internal error: #app container missing");
} else {
  runApp(container).catch((err: unknown) => {
    console.error(err);
    showBanner(err instanceof Error ? err.message : String(err));
  });
}
