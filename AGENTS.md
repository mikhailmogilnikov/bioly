# Bioly — Agent Guide

> Руководство для AI-агентов по работе с проектом Bioly. Оптимизировано для автоматизации и согласованности.

---

## Что такое Bioly

Bioly — веб-приложение для создания персональных страниц (link-in-bio). Пользователь редактирует профиль в редакторе: добавляет блоки (bento), настраивает тему, соцсети. Публичная страница доступна по `/[username]` или `/[lang]/[username]`.

---

## Tech Stack

| Категория | Технология |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| Runtime | Bun |
| UI | React 19, Tailwind CSS 4, Radix UI, Base UI |
| State | create-gstore (глобальные сторы) |
| i18n | Lingui (Trans, msg\`) |
| Rich text | TipTap |
| Lint/Format | Ultracite (Biome) |
| API types | OpenAPI → openapi-typescript |

---

## Команды

Проект использует **bun** (есть `bun.lock`). Не использовать pnpm или npm.

```bash
bun run dev       # Запуск dev-сервера
bun run build     # Сборка (standalone output)
bun run start     # Запуск production
bun run lint      # ultracite check
bun run fix       # ultracite fix --unsafe
bun run ts        # tsc --noEmit
bun run typegen   # next typegen (typed routes)
bun run extract   # lingui extract --clean
bun run compile   # lingui compile
bun run gen-api   # Генерация типов из rest-api.yaml
```

---

## Архитектура (Evolution Design)

Слои с односторонними импортами (только вниз):

```
app/ ─────┐
          ↓
features/ ┼─────┐
          ↓     ↓
shared/   ──────┘
```

**Важно:** В проекте нет слоя `services/`. API-клиент, storage и утилиты живут в `shared/`.

### Правила импортов

- `app/` → features, shared
- `features/` → shared (не другие features, не app)
- `shared/` → ничего

**Без barrel-файлов** — импорты напрямую из конкретных файлов:

```ts
import { Button } from "@/shared/ui/kit/primitives/button";
import { useProfile } from "@/features/editor/profile/use-profile";
```

---

## Структура проекта

```
src/
├── app/                    # Роутинг, layout, глобальные стили
│   ├── [lang]/             # Локализованные маршруты
│   │   ├── (brand)/        # Лендинг, логин, explore
│   │   └── (personal)/     # Редактор (требует auth)
│   ├── [[...slug]]/        # Публичная страница пользователя
│   └── css/
├── features/
│   ├── auth/               # Логин, OTP, регистрация
│   ├── editor/             # Главная фича — редактор профиля
│   │   ├── bento/          # Сетка блоков (Muuri)
│   │   │   ├── blocks/     # Типы блоков: gallery, link, text, map
│   │   │   └── grid/       # Сетка, drag&drop
│   │   ├── header/         # Шапка редактора
│   │   ├── menu/           # Боковое меню (настройки, профиль, share)
│   │   ├── profile/        # Профиль, тема, bento-данные
│   │   └── text-editor/    # TipTap-редактор для текстовых блоков
│   └── page/               # Layout публичной страницы
└── shared/
    ├── api/                # OpenAPI schema, generated types
    ├── assets/            # Иконки, статика
    ├── domain/            # Доменные типы (theme и т.д.)
    ├── i18n/              # Lingui init, локали
    ├── lib/               # Хуки, утилиты, провайдеры
    ├── model/             # Конфиг
    └── ui/                # UI-кит (primitives, overlays, shadcn)
```

---

## Ключевые концепции

### Bento-блоки

Типы: `gallery`, `link`, `text`, `map`. Каждый блок имеет:

- `id`, `type`, `order`
- `size` (2x2, 4x1, 2x4, 4x2, 4x4, dynamic)
- `style` (plain, shadow, outline, transparent)
- Специфичные `properties` (из OpenAPI schema)

Добавление нового типа блока:

1. Расширить schema в `shared/api/schema/rest-api.yaml`
2. Запустить `pnpm gen-api`
3. Добавить вариант в `blocks/variants/`
4. Обновить `use-render-block.tsx` и `use-render-block-settings.tsx`
5. Обновить `gen-new-bento-defaults.ts`

### Профиль и состояние

- `useProfile` (create-gstore) — основной профиль, bento-блоки, тема
- `useBentoStore` — состояние сетки (размеры, фокус)
- Данные сохраняются в `LocalStorageService` (localProfile)

### shadcn/ui

Компоненты в `@/shared/ui/kit/shadcn`. Добавление:

```bash
npx shadcn@latest add <component>
```

`components.json` указывает `@/shared/ui/kit/shadcn` как директорию.

### i18n (Lingui)

- `Trans` для JSX
- `msg\`` для строк вне JSX
- Локали в `shared/i18n/locales/`
- `bun extract` → `bun compile` перед коммитом при изменении переводов

---

## Чеклист перед завершением задачи

- [ ] `bun run fix` выполнен
- [ ] `bun run ts` без ошибок
- [ ] Импорты только вниз по слоям (features не импортируют features)
- [ ] Прямые импорты, без barrel-файлов
- [ ] При изменении переводов: `bun run extract` и `bun run compile`
- [ ] При изменении OpenAPI: `bun run gen-api`

---

## Skills и Rules

Проект использует Cursor Skills для контекста:

| Skill | Когда применять |
|-------|-----------------|
| `bioly-code-standards` | Написание/редактирование кода |
| `shadcn-ui` | Добавление или кастомизация shadcn-компонентов |
| `evolution-design` | Добавление фич, организация модулей |
| `create-gstore` | Глобальное состояние, создание/использование сторов |

---

## Коммиты

Используются [Conventional Commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13): `feat:`, `fix:`, `refactor:`, `chore:` и т.д.

---

## Полезные ссылки

- [Evolution Design](https://ed.evocomm.space/guide/ed-small/)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Lingui](https://lingui.dev/)
- [TipTap](https://tiptap.dev/)
