# 1주차 미션: Vanilla-Todo

# 배포
[이규호 Todo List](https://vanilla-todo-18th-raimixto7-leekyuho114.vercel.app/)

# Key Questions

- DOM은 무엇인가요?

DOM(문서 객체 모델)은 웹 페이지(HTML이나 XML 문서)의 콘텐츠 및 구조, 그리고 스타일 요소를 구조화 시켜 표현하여 프로그래밍 언어가 해당 문서에 접근하여 읽고 조작할 수 있도록 API를 제공하는 일종의 인터페이스이다. 다시 말해 자바스크립트 같은 스크립팅 언어가 쉽게 웹 페이지에 접근하여 조작할 수 있게끔 연결시켜주는 역할을 담당한다.

DOM은 HTML 문서를 계층적 구조와 정보로 표현하고, 이를 제어할 수 있는 프로퍼티와 메서드를 제공하는 트리 자료구조이다. 따라서 HTML DOM 혹은 DOM tree라고 부르기도 한다.


- HTML (tag) Element를 JavaScript로 생성하는 방법은 어떤 것이 있고, 어떤 방법이 가장 적합할까요?

1. `createElement`
```javascript
var newDiv = document.createElement('div');
```
createElement는 지정 tagName의 HTML Element를 생성하는 메서드이다. HTML Element를 생성해 append하기 때문에 node만 삽입이 가능하다.

2. `insertAdjacentHTML`
```javascript
element.insertAdjacentHTML(position, text);
```
insertAdjacentHTML은 target HTML Element의 특정 위치에 원하는 node를 추가할 수 있는 메서드이다. 가독성이 좋다는 장점이 있다.

- Semantic tag에는 어떤 것이 있으며, 이를 사용하는 이유는 무엇일까요?

Semantic은 '의미론적인'이라는 뜻을 가진 형용사이므로 Semantic tag는 의미가 있는 태그를 뜻한다. header, nav, section, article 등의 태그가 이에 해당한다.

HTML 문서의 가독성과 유지보수가 쉽기 때문에 유지보수를 하거나 다른 작업자가 코드를 볼 때 파악하기 쉽다는 장점이 있다. 또한 검색엔진이 검색을 수행할 때 HTML 내의 태그를 분석할 수 있다.

- Flexbox Layout은 무엇이며, 어떻게 사용하나요?

Flexbox Layout은 CSS의 display 속성 중 하나로, 요소들을 가로 혹은 세로 축 정렬하고 유연하게 배치하는 레이아웃 모델이다. 

CSS container에 `display:flex`를 이용하여 요소들의 정렬 방식을 조정하거나 정렬 방향을 변경한다. 또한 flex의 다양한 속성을 사용하여 공간을 분배하고 필요에 따라 크기를 조정한다.

- JavaScript가 다른 언어들에 비해 주목할 만한 점에는 어떤 것들이 있나요?

1. 웹 브라우저에서 직접 실행되는 스크립트 언어이기 때문에 동적인 웹 페이즈를 만들거나 상호작용을 추가할 수 있다.
2. 웹 브라우저 뿐만 아니라 서버 측 애플리케이션 개발에도 사용된다.
3. javascript를 이용하여 작은 웹 사이트부터 대규모 웹 어플리케이션까지 높은 확장성을 가지고 있다.
4. javascript는 다양한 라이브러리와 기능이 있어 다양한 기능을 빠르게 구현할 수 있다.

- 코드에서 주석을 다는 바람직한 방법은 무엇일까요?

주석은 코드의 가독성과 유지보수성을 향상시키기 위해 중요하다. 
1. 의도를 설명하는 주석을 작성해야한다. 코드 자체가 무엇을 하는지 설명하는 주석은 필요하지 않다.
2. 중요한 정보나 코드를 강조하기 위해 사용한다.
3. TODO 및 FIXME와 같은 작업해아할 부분을 주석으로 사용한다.
4. 협업에 있어 주석의 일관성을 가지고 컨벤션을 지키며 작성한다.
5. 과도한 주석은 피한다.

# 후기
- 코드의 구조나 여러 메서드의 용도를 정확히 파악하면서 구현하려하다 보니 저의 부족한 부분을 뼈져리게 느꼈습니다.. 차후 과제에서 더 단단해지기 위해 열심히 하겠습니다!! React로만 구현을 하다가 JavaScript로 기능들을 구현하니 부족한 개념도 보완하고 이해도가 높아지는 시간이였습니다! 

- 커밋컨벤션에 맞춰 git을 사용하는 거에 더 익숙해져야할 것 같아 github를 더 유용하게 사용하도록 노력하겠습니다😊

