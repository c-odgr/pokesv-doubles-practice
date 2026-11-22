// 047: the engine in this worker (Pyodide). The page posts {id, path, body}; the answer is
// what the PC's server would have sent for the same request.
const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";
importScripts(PYODIDE + "pyodide.js");

const say = (text) => postMessage({ id: 0, text });

const ready = (async () => {
  say("Python を読み込んでいます…");
  const py = await loadPyodide({ indexURL: PYODIDE });
  say("エンジンを読み込んでいます…");
  const zip = await (await fetch("pokesv_sim.zip")).arrayBuffer();
  py.unpackArchive(zip, "zip", { extractDir: "/home/pyodide/app" });
  py.runPython(`
import json, sys
sys.path.insert(0, "/home/pyodide/app")
from pokesv_sim.play.server import App
from pokesv_sim.play.session import StepGame
app = App(StepGame)
app.teams()  # (built once, before the first screen)

def handle(path, body):
    if path == "/api/phone":
        return json.dumps({"url": ""})
    data = app.get(path) if body is None else app.post(path, json.loads(body))
    return json.dumps(data if data is not None else {}, ensure_ascii=False)
`);
  say("");
  return py.globals.get("handle");
})();

onmessage = async (e) => {
  const { id, path, body } = e.data;
  try {
    const handle = await ready;
    postMessage({ id, ok: true, data: JSON.parse(handle(path, body)) });
  } catch (err) {
    postMessage({ id, ok: false, error: String(err && err.message || err) });
  }
};
