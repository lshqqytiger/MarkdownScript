# MarkdownScript

Markdown + JavaScript

# 문법

## 여러 줄

```javascript
^- for(let i = 0; i < 5; i++)
    appendl(`### ${i}`);
-^
```

## 한 줄

1 + 2 = ^(1 + 2)^

## 함수 선언

```javascript
^f foo(a, b)
    return `${a} + ${b} = ${a + b}`;
f^
```

## 함수 호출

^(foo(1, 2))^

# 내장 함수

```javascript
append(string);

appendl(string);
```
