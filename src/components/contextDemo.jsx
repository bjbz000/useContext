"use client"

import React, { useState } from "react";
import BasicContext from "./scenarios/basicContext";
import PropDrillingContext from "./scenarios/propDrillingContext";
import RerenderIssueContext from "./scenarios/reRenderIssueContext";
import MemoizedContext from "./scenarios/memoizedContext";

export default function ContextDemo() {
  const [scenario, setScenario] = useState("basic");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2> useContext Demo Playground</h2>
      <select onChange={e => setScenario(e.target.value)} value={scenario}>
        <option value="basic">1. Basic Context</option>
        <option value="drill">2. Avoid Prop Drilling</option>
        <option value="rerender">3. Re-render Issue</option>
        <option value="memo">4. Fix Re-render with Memo</option>
      </select>
      <hr />
      {
        scenario === "basic" ? <BasicContext /> :
        scenario === "drill" ? <PropDrillingContext /> :
        scenario === "rerender" ? <RerenderIssueContext /> :
        <MemoizedContext />
      }
    </div>
  );
}
