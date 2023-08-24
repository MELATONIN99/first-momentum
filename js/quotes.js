const quotes = [
{
    quote:"꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다.",
    author:"-괴테",
},
{
    quote:"오늘이란 신어야 할 신발과 같은 것이다.",
    author:"-스티브 올렌",
},
{
    quote:"계획이란 미래에 대한 현재의 결정이다.",
    author:"-드래커",
},
{
    quote:"시간을 선택하는 것은 시간을 절약하는 것이다.",
    author:"-베이컨",
},
{
    quote:"승자는 시간을 관리하며 살고, 패자는 시간에 끌려 산다.",
    author:"-J.하비스",
},
{
    quote:"기다림만으로 사는 사람은 굶어서 죽는다.",
    author:"-이탈리아 속담",
},
];
const quote = document.querySelector("#quotes span:first-child");
const author = document.querySelector("#quotes span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;