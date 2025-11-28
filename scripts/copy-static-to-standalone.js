#!/usr/bin/env node

const { cpSync, existsSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

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

// Копируем статические файлы
if (existsSync(staticSource)) {
  console.log("Copying static files to standalone...");
  cpSync(staticSource, staticTarget, { recursive: true, force: true });
}

// Копируем public файлы
if (existsSync(publicSource)) {
  console.log("Copying public files to standalone...");
  cpSync(publicSource, publicTarget, { recursive: true, force: true });
}

console.log("Static files copied successfully!");
