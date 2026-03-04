---
name: create-gstore
description: create-gstore — библиотека глобального состояния для React. Use when creating global state, converting hooks to global stores, or accessing state outside React components. Wraps any hook with createGStore, supports selectors and getState().
---

# create-gstore

Библиотека [create-gstore](https://evo-community.github.io/use-gstate/) превращает любой React-хук в глобальный стор. Без провайдеров и prop drilling.

## Создание стора

```tsx
import { createGStore } from "create-gstore";
import { useState, useCallback } from "react";

export const useCounter = createGStore(() => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  return { count, setCount, increment };
});
```

Внутри можно использовать: `useState`, `useRef`, `useMemo`, `useCallback`, `useEffect`, `useLayoutEffect`, `useReducer`.

## Использование в компонентах

**Полный стор** (ре-рендер при любом изменении):

```tsx
const { count, increment } = useCounter();
```

**С селектором** (ре-рендер только при изменении выбранного поля):

```tsx
const count = useCounter((s) => s.count);
const increment = useCounter((s) => s.increment);
```

## Императивный доступ вне React

`getState()` возвращает текущее состояние. Используй в:
- колбэках и обработчиках событий
- других сторах (cross-store)
- вне компонентов

```tsx
// В другом сторе
const block = findBentoItem(blockId, useProfile.getState());

// В колбэке
const handleClick = () => {
  const { profile } = useProfile.getState();
  doSomething(profile);
};
```

## Паттерны из проекта

**Простой стор с ref и state:**

```tsx
export const useBentoStore = createGStore(() => {
  const sizerRef = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState<number | null>(null);
  return { sizerRef, gridSize, setGridSize };
});
```

**Стор с cross-store доступом:**

```tsx
export const useHandleTimers = createGStore(() => {
  const updateTimer = useCallback((key, id, duration) => {
    const { timers, setTimers } = useTimers.getState();
    setTimers({ ...timers, [key]: { ...timers[key], [id]: duration } });
  }, []);
  return { updateTimer };
});
```

**Типизация getState:**

```tsx
store: ReturnType<typeof useProfile.getState>
```

## Ограничения

- Ограниченная поддержка `useContext`
- Не поддерживает: `useTransition`, `useDeferredValue`, `useFormStatus`, `useActionState`, `useOptimistic`

## Ссылки

- [Документация](https://evo-community.github.io/use-gstate/)
- [GitHub](https://github.com/evo-community/use-gstate)
