# MarkdownScript

Markdown + JavaScript

갑자기 떠올라 구상한 MarkdownScript와 그것을 마크다운으로 변환하는 하루 만에 급조한 매우 보안이 취약한 cli 프로그램

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

```javascript
^(foo(1, 2))^
```

# 내장 함수

```javascript
append(string);

appendl(string);
```
