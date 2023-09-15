# 1주차 미션: Vanilla-Todo

## 필수 요건 설명

- [배포 링크](vanilla-todo-18th-modsiw.vercel.app)
- CSS의 Flexbox의 경우, ~~grid를 딱... 한 번 쓰긴 했지만...~~ 그 외에는 모두 flex 사용했습니다!
- html, css, js로 코드 작성하였습니다.
- 제 나쁜 습관 중 하나가 commit을 뜸하게 날린다는 것인데요..!

  초반에는 노력했으나 후반부 타임어택 이슈로 듬성한 commit을 남기게 되어 조금은 아쉽습니다🥲

## 기능 설명
(볼륨이 작아서 뺄까 고민했지만 그래도 적어봅니다...)

|시작 화면|입력창|실행 화면|
|:---:|:---:|:---:|
|<img src="https://github.com/mod-siw/vanilla-todo-18th/assets/127821462/db550e73-6459-4ae3-977c-db0d748ba80f" width="300"/>|<img src="https://github.com/mod-siw/vanilla-todo-18th/assets/127821462/eb716d9e-eb1e-4ada-8113-79331134414e" width="300"/>|<img src="https://github.com/mod-siw/vanilla-todo-18th/assets/127821462/076325d2-0c06-4d95-9a7b-99b3a65334e3" width="300"/>|


1. 처음 화면에 있는 회색 바는 입력창이 아니라 progress bar입니다!
2. 왼쪽의 연필 모양 아이콘을 클릭하시면 입력창이 나타나요.
3. list item hover하면 색이 바뀌는 동시에 삭제 버튼도 나타납니다.
4. donelist로 이동하면 progress bar에도 반영이 됩니다! (입력창에서 다시 돌아가주세요.)
5. progress bar 오른편에는 끝낸 항목 / 전체 항목을 숫자로 나타냈습니다.
6. 중간중간 소소하게 트랜지션을 넣어봤으니 한 번 봐주시면 감사하겠습니다😊

## 아쉬운 점 + 더 구현하고 싶은 기능 

#### 아쉬운점
* **코드를 더 효율적으로 써야할 것 같습니다.** <br />
  기능 구현이 최우선이라는 마인드를 버리고 싶었지만... 해당 마인드가 여전히 남아있는 코드들입니다ㅜㅜ <br />
  앞으로는 처음 짤 때부터 어떤 방식이 효율적일까 좀 더 고민하고서 써내려가고 싶습니다.  <br />
  todo, done 파트를 나눠 일일이 함수를 만들었는데, 이를 하나로 묶은 경우를 전 기수 코드에서 보고 많이 반성했습니다..🥺 <br />
  css 같은 경우도 background img 설정은 한 줄로 묶을 수 있는 게 많았는데 놓쳐서 아쉽습니다. <br />
  
* **애매한 반응형... ( 글씨 크기!!)** <br />
  최대한 px 단위로 지정하지 않으려 노력했지만... 그리고 이런저런 다양한 꼼수들을 써봤지만 반응형은 쉽지 않네요. <br />
  특히 글자 크기도 %나 다른 단위를 사용했으면 좋았겠다는 생각이 많이 듭니다. <br />
  보신다면 150% 추천, 적어도 100% 이상으로 봐주시면 감사하겠습니다..ㅎㅎ

* **사용자 편의성?** <br />
  삭제 버튼을 원래는 hover 시에 뜨는 게 아니라 떠있는 상태로 디자인해서인지 text와 꽤 떨어져있는데요. <br />
  정렬되어 있는 깔끔함을 선택할까 편의성을 고려할까 하다가 일단은 원래대로 해놓았습니다. <br />
  삭제 버튼 크기를 줄여서 깔끔하게 뜨되 편하게 누를 수 있는 위치에 놓았어도 좋았을 것 같습니다. <br />

#### 더 구현해보고 싶은 기능
1. **progress 상태에 따라 전체 style color 변경** <br />
   원래 처음 하고 싶었던 것은 progress 에 따라 border, list item 등 전체적인 style color가 그라데이션으로 바뀌는 것을 해보고 싶었어요. 그래서 너무 React만 썼었는지... progress 비율에 따라 색을 지정하는 함수를 만들고, 이를 props ~~(여기부터 vanilla로는 글렀다고 생각하긴 했다...)~~ 로 전달하면 가능하지 않을까! 싶었습니다. 하지만 가뜩이나 시간도 부족해서 이를 구현할 시간이 택도 없었기에..^^ 정해진 색으로 우선 제출해보았습니다.  


2. **날짜 부분 달력 형태로 나타내기**
   localstorage 값에 날짜에 따른 todolist를 넣어보면 어떨까 싶기도 했는데요. 그러면 날짜별로 list가 달라져서 이용하기가 불편할 것 같다는 생각이 들어... 달력 형태로 하되 드래그 앤 드롭 기능으로 item들 옮길 수 있으면 좋지 않을까 생각만 해봤습니다...ㅎㅎ 그래도 디자인적인 면에서 달력으로도 나타낼 수 있으면 좋을 것 같습니다!




# 링크 및 참고자료

- [로컬에서 만든 branch 안 보일 때](https://pythontoomuchinformation.tistory.com/457) 
- [Git add, commit, push 취소하기](https://hidaehyunlee.gitbook.io/fork-my-brain/git/git-add-commit-push)
- [배경 이미지 관련 CSS](https://heinafantasy.com/168) 

  이건 자료는 찾아봤지만 시간과 디자인 감각 부족으로 실패한..^^ 달력 관련 자료입니다!
- [자바 스크립트를 이용한 달력 만들기](https://velog.io/@sohyeonbak_oly/%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%8B%AC%EB%A0%A5%EB%A7%8C%EB%93%A4%EA%B8%B0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%B8%EB%8D%B0-%EC%83%81%EB%8B%B4%EC%8B%A0%EC%B2%AD%EC%9D%84-%EA%B3%81%EB%93%A4%EC%9D%B8)

