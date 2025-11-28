#!/usr/bin/env node

const { cpSync, existsSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");
const { spawn } = require("node:child_process");

const projectRoot = join(__dirname, "..");

const staticSource = join(projectRoot, ".next/static");
const staticTarget = join(projectRoot, ".next/standalone/.next/static");
const publicSource = join(projectRoot, "public");
const publicTarget = join(projectRoot, ".next/standalone/public");

// Создаем директорию .next в standalone, если её нет
const nextDir = join(projectRoot, ".next/standalone/.next");
if (!existsSync(nextDir)) {
  mkdirSync(nextDir, { recursive: true });
}

// Копируем статические файлы, если их нет в standalone
if (existsSync(staticSource) && !existsSync(staticTarget)) {
  console.log("Copying static files to standalone...");
  cpSync(staticSource, staticTarget, { recursive: true });
}

// Копируем public файлы, если их нет в standalone
if (existsSync(publicSource) && !existsSync(publicTarget)) {
  console.log("Copying public files to standalone...");
  cpSync(publicSource, publicTarget, { recursive: true });
}

// Запускаем сервер из директории standalone
const serverPath = join(projectRoot, ".next/standalone/server.js");
if (!existsSync(serverPath)) {
  console.error("Error: server.js not found in .next/standalone/");
  console.error("Please run 'bun run build' first.");
  process.exit(1);
}

const standaloneDir = join(projectRoot, ".next/standalone");
process.chdir(standaloneDir);

// Запускаем сервер через spawn для правильной работы с путями
const serverProcess = spawn("node", ["server.js"], {
  cwd: standaloneDir,
  stdio: "inherit",
  env: process.env,
});

serverProcess.on("error", (error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

serverProcess.on("exit", (code) => {
  process.exit(code ?? 0);
});
