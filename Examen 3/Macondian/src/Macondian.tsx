///
/// Macondian.tsx
///

import { SubmitEvent, useEffect, useRef, useState } from 'react';

import Chart from "./Chart";
import CLI from "./CLI";
import Image from "./Image";
import List from "./List";
import Monitor from "./Monitor";
import ToolBar from "./ToolBar";

import 'bootstrap/dist/css/bootstrap.min.css';

const project = "ZenSheet™";
const artefact = "Macondian Simulator";
const version = "V-20260901";

const title = <h3>The Great {artefact}</h3>;
const product = <em><b>{artefact}</b> Interactive Computing Environment</em>;
const copyright = <>Copyright © <b>Lakebolt™ Research</b> 2024-2026</>;

const MONITOR_SIZE = 1024;
const CHART_SIZE = 40;

const tgmr = new Worker(new URL("./Macondian/tgmr-thx-1138.js", import.meta.url));

const processRawLine = (rawLine: string): { text: string; avg: number | null } => {
  if (!rawLine || typeof rawLine !== 'string') return { text: '', avg: null };

  const sensorMatch = rawLine.match(/[A-Z]\d+/i);
  const sensor = sensorMatch ? sensorMatch[0] : 'MACONDO';

  const bracketMatch = rawLine.match(/\[(.*?)\]/);
  if (bracketMatch && bracketMatch[1]) {
    const numStrings = bracketMatch[1].split(',');
    const numbers = numStrings
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));

    if (numbers.length > 0) {
      const suma = numbers.reduce((acc, val) => acc + val, 0);
      const promedio = suma / numbers.length;
      const text = `[SENSOR ${sensor}] Microsensores: [${numbers.join(', ')}] | Promedio: ${promedio.toFixed(3)}`;
      return { text, avg: promedio };
    }
  }

  return { text: rawLine, avg: null };
};

const Macondian = () => {
  const command = useRef<HTMLInputElement>(null);

  const [rawLog, setRawLog] = useState<string[]>([]);
  const [seriesLog, setSeriesLog] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  const [ux, setUX] = useState(0);

  const uxColor = (mode: number) => {
    return mode === ux ? "Yellow" : "Gray";
  };

  const [error] = useState<string>('');

  const [leftPct, setLeftPct] = useState(50);
  const splitRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!dragging.current || !splitRef.current) return;
      const rect = splitRef.current.getBoundingClientRect();
      const pct = ((event.clientX - rect.left) / rect.width) * 100;
      setLeftPct(Math.min(80, Math.max(20, pct)));
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const startDrag = (event: React.MouseEvent) => {
    event.preventDefault();
    dragging.current = true;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
  };

  const addHistoryItem = (item: string) => {
    setRawLog((h) => (h.length < MONITOR_SIZE ? [...h, item] : [...h.slice(1), item]));
  };

  const addSeriesItem = (item: string) => {
    setSeriesLog((h) => (h.length < MONITOR_SIZE ? [...h, item] : [...h.slice(1), item]));
  };

  const addChartValue = (val: number) => {
    setChartData((c) => (c.length < CHART_SIZE ? [...c, val] : [...c.slice(1), val]));
  };

  useEffect(() => {
    tgmr.onmessage = (envelope: MessageEvent) => {
      const data = envelope.data;
      if (!data) return;
      const rawText = String(data);
      addHistoryItem(rawText);

      const processed = processRawLine(rawText);
      if (processed.text) {
        addSeriesItem(processed.text);
      }
      if (processed.avg !== null) {
        addChartValue(processed.avg);
      }
    };
  }, []);

  const send = (request: string) => {
    tgmr.postMessage(`${request}`);
  };

  const clearLogs = () => {
    setRawLog([]);
    setSeriesLog([]);
    setChartData([]);
  };

  const start = () => send(".start");
  const reset = () => {
    send(".reset");
    setTimeout(clearLogs, 496);
  };

  const nop = () => {};

  const kvp = [
    { key: ".start", fun: start },
    { key: ".reset", fun: reset },
  ];

  const map = (key: string) => {
    for (let element of kvp) {
      if (key === element.key) return element.fun;
    }
    return nop;
  };

  const cliRequest = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (command.current) {
      const request = command.current.value;
      command.current.value = "";
      map(request)();
    }
  };

  const rawView = (
    <div className="app-split" ref={splitRef}>
      <section className="app-pane" data-bs-theme="dark" style={{ flexGrow: leftPct }}>
        <Monitor title={"señal cruda"} log={rawLog} />
      </section>
      <div className="pane-divider" onMouseDown={startDrag} title="Drag to resize" />
      <section className="app-pane" style={{ flexGrow: 100 - leftPct }}>
        <Image image={"MAC997.jpg"} />
      </section>
    </div>
  );

  const testView = (
    <div className="app-split" ref={splitRef}>
      <section className="app-pane" data-bs-theme="dark" style={{ flexGrow: leftPct }}>
        <Monitor title={"señal cruda"} log={rawLog} />
      </section>
      <div className="pane-divider" onMouseDown={startDrag} title="Drag to resize" />
      <section className="app-pane" style={{ flexGrow: 100 - leftPct }}>
        <Monitor title={"serie"} log={seriesLog} />
      </section>
    </div>
  );

  const chartView = (
    <div className="app-split" ref={splitRef}>
      <section className="app-pane" data-bs-theme="dark" style={{ flexGrow: leftPct }}>
        <Monitor title={"señal cruda"} log={rawLog} />
      </section>
      <div className="pane-divider" onMouseDown={startDrag} title="Drag to resize" />
      <section className="app-pane" style={{ flexGrow: 100 - leftPct }}>
        <Chart data={chartData} />
      </section>
    </div>
  );

  const imageView = <Image image={Math.random() < 0.5 ? "ART042.jpg" : "ART067.png"} />;
  const listView = <List />;

  const views = [rawView, testView, chartView, imageView, listView];

  return (
    <div className="app-shell">
      <header className="app-header">
        <>{title}</>
      </header>
      <ToolBar
        start={start}
        reset={reset}
        uxColor={uxColor}
        setUX={setUX}
        error={error}
      />
      <main className="app-main">{views[ux]}</main>
      <CLI req={cliRequest} ref={command} />
      <footer className="app-footer">
        <h6>
          <b>{project}</b> Project: {product} {version} - {copyright}{" "}
        </h6>
      </footer>
    </div>
  );
};

export default Macondian;