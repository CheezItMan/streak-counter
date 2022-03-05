# Streak Counter

This is a basic streak counter - inspired by Duolingo - written in Typescript & meant for the browser (uses `localStorage`).

## Install 

```shell
yarn add @jsjoeio/streak-counter
```

```shell
npm install @jsjoeio/streak-counter
```

### Usage

```typescript
import { streakCounter } from "@jsjoeio/streak-counter";

const today = new Date();

const streak = streakCounter(localStorage, today);

// Streak returns an object:
// {
//    currentCount: 1;
//    lastLoginDate: 
}
```