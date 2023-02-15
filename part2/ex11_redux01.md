
## ✅ Redux가 뭐죠?
- Cart 컴포넌트 만들고, 테이블로 표시해줌
- 여기에 장바구니 데이터를 보여주고 싶음
- 데이터를 state로 관리 해야겠지?
- 그런데 해당 state가 app, detail 등 다양한 곳에서 사용된다고 가정해보면,
    => state는 최상위인 app에 생성을 해야함
    => 근데 사실 이렇게 하면 또 props 전송이 귀찮다
    => 이를 편하게 해주는 🌟 Redux 🌟

- Redux 사용하면 컴포넌트들이 props 없이 state 공유 가능
    => redux store.js 에 state를 모아서 관리
    => 모든 컴포넌트들에서 꺼내다 쓸 수 있음

- 먼저 확인 하나
    => package.json (여러 라이브러리 버전 정보 등 담고있음)
    => react와 react-dom이 18.1버전 이상이어야 redux 정상적으로 작동


#### ❗️typescript 환경에서 tsx 파일에서는 오류 겁나 남
#### 그래서 일단 js파일로 수업 다 듣고, redux와 친해진 후에
#### typescript 적용방법을 모색할 계획


<br><br>

## ✅ Redux 기본 세팅
- 설치하기
> 터미널> npm install @reduxjs/toolkit react-redux
- react + TypeScript 환경
> 터미널> npm install --dev @types/react-redux

<br>

- 기본 세팅하기
1. store.js 파일 생성
    - src 폴더에 생성
    - 정해진 코드 넣어주기
        ```
        import { configureStore } from '@reduxjs/toolkit'

        export default configureStore({
            reducer: { }
        }) 
        ```
2. index.jsx(tsx) 에서 사용하겠다고 선언해주기
    - import 해주기
        ```
        import { Provider } from 'react-redux';
        import store from './store';
        ```
    - BrowserRouter, App 감싸주기
        ```
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
        ```
    => 여기까지만 하면 App 컴포넌트와 모든 자손 컴포넌트에서 store에 담긴 state를 맘대로 꺼내 쓸 수 있음


<br><br>


## ✅ Redux에 state 저장하기

- store.js파일에서 createSlice 사용
- createSlice는 useState와 같은 역할
- name과 initialState로 선언후 reducer에 꼭 담아주기!!
    ```
    import { configureStore, createSlice } from '@reduxjs/toolkit'

    // state 생성하기
    // 🌟 state 하나를 slice라고 부름!! 🌟
    let state이름 = createSlice({    
        name : 'state이름',
        initialState : 'value'
    })
    // 이 형식을 새로 만들어 여러 state를 만들 수 있음!! (useState 여러개 하는 것처럼)

    export default configureStore({
        reducer: {
            // 여기 꼭 등록해줘야함
            작명 : state이름.reducer
        }
    }) 
    ```

## ✅ 저장된 state 꺼내오기
- 일반 파일에서
- useSelector import해서 사용
    ```
    import { useSelector } from "react-redux";
    function Cart(){
        // Redux store에 있던 모든 state가 들어옴
        let states = useSelector((state)=>{ return state })
        console.log(states) // => 모든 state 오브젝트로 담겨있음
        console.log(states.state이름) // => 해당 이름 state가 찍힘
        ...
    }
    ```

## ✅ useSelector 편하게 쓰려면
```
let states = useSelector((state)=>{ return state })
```
- useSelector 안에 화살표함수는 정해진 규칙인데,
- 파라미터로 받는 state는 store 안에 있던 모든 state
- 그래서 return문에서부터 특정 state를 지정하면 변수에도 해당 내용만 담긴다!!
```
// 특정 state를 변수에 담기
let states = useSelector((state)=>{ return state.특정state })
```
+) 화살표 함수 특성상 중괄호와 return 생략가능


### 참고사항
- redux 편한데 props 왜씀??
    => 외부 라이브러리, 등록 등 코드가 간단한 프로젝트에서는 더 복잡
- 모든 state를 Redux store에 넣을 필요는 없다
    => 딱 한 컴포넌트에서만 쓰면 굳이 써야할 이유가 없다


<br><br>


## ✅ State 변경하기
- createSlice에서 state 수정 함수 만들고,
- 원할 때 그 함수 실행해달라고 store.js에 요청
- 순서대로 봐보자면
    1. state 수정 함수 만들어주기
        ```
        let state이름 = createSlice({    
            name : 'state이름',
            initialState : 'value',
            // state 수정함수
            reducers : {
                수정함수이름(🔸파라미터 넣으면 기존 state 담김🔸){
                    return 'new value';
                }
            }
        })
        ```
    2. 만든 함수 export 해주기
        ```
        state이름.actions
        // state 변경 함수들이 담김

        // 관습적으로 Destructuring 사용
        export let {setState, changeState, ...} = state이름.actions;
        ```
    3. 만든 함수 useDispatch와 함께 import 해서 사용
        - useDispatch는 store.js에 요청을 보내주는 함수
        - useDispatch는 요청만, 실행은 store.js가!!
        - import 하기
            ```
            // 변경함수 import
            import setState from '/store경로'

            // useDispatch import
            import {useDispatch} from "react-redux";
            ```
        - 사용하기
            ```
            // 컴포넌트 안에서 useDispatch
            let dispatch = useDispatch();

            // dispatch로 import한 변경함수 사용
            <button onClick={()=>{
                dispatch(setState());
            }}> change </button>
            ```

- 방법이 다소 복잡해 보이는데,
- 정해진 형식이라 어쩔수 없음
- 그리고 사실상 사이즈가 커지다보면 버그 방지등 장점이 많음
    => 다양한 컴포넌트가 state를 직접 수정하려다보면 버그 발생시 원인 찾기 어려움
    => 수정함수를 통하면 버그 추적이 용이 (state 이상해지면 store.js의 수정함수만 문제!!)


<br><br>


## ✅ Array, Object 자료형 State 변경하기
- 하드코딩으로 하자면 reducers 내부 함수에서 리턴문에 넣어주면 됨
```
let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 27},
  reducers : {
    setName(){
        return {name : 'Yu', age : 27}
    }
  }
```
- 근데 사실 Array / Object의 경우 직접 수정해도 state가 변경됨
```
  reducers : {
    setName(state){
        state.name = 'Yu'
    }
  }
```
- 정확히는 함께 설치된 Immer.js의 도움
- 이처럼 배열과 객체 자료형의 수정이 더 편리하기 때문에 단일값도 배열이나 객체에 넣는 경우도 있음

<br>

### 🔹 State 변경함수에 파라미터 뚫기
- state 변경함수에 파라미터 하나 넣으면 자동으로 state 담기지만,
- 하나 더 넣어주면 파라미터 자리를 만들어 줄 수 있음
- 그리고 변경함수 내부에서는 해당 파라미터 변수에 🌟 .payload 🌟 를 붙여줘야 정상적으로 사용 가능!!!
    => dispatch로 전송하는 메시지에 화물을 실어 보내는 형식
- 관습적으로 파라미터 이름은 'action'으로 작명
    => 화물 뿐만 아니라 여러가지 action( == 변경함수)에 대한 정보도 들어있기 때문에
```
let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 27},
  reducers : {
    agePlus(state, action){
        state.age += action.payload;
    }
  }`
```


<br><br>


## ✅ 파일 분할하기
- 코드가 길어지면 import, export 활용하쟈!!
- src 내부에 폴더 만들어서 사용



- 숙제1
  - => 변경하기 버튼으로 수량 추가
  - 근데 그냥 해당 칸에 대한 정보로 추가하면 정렬에 따라 대상 바뀜
  - 버튼 누르면 해당 행의 id 값을 넘겨줘서 비교할 수 있겠지?

- 숙제2
  - /detail에서 주문하기 누르면 정보 장바구니러 넘어가기
  - state 설정에서 넣어주면 되지 않겠니??


응용1. 표의 행마다 삭제버튼 만들고 그거 누르면 상품이 삭제되게 만들려면?

응용2. 주문하기 버튼 누를 때 이미 상품이 state안에 있으면 추가가 아니라 기존 항목 수량증가만?