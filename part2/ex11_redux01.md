
## Redux가 뭐죠?
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

## Redux 기본 세팅
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



### Redux에 state 저장하기

- store.jsx파일에서 createSlice 사용
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

### 저장된 state 꺼내오기
- 일반 파일에서
- useSelector import해서 사용
    ```
    import { useSelector } from "react-redux";
    function Cart(){
        // Reduxdp store에 있던 모든 state가 들어옴
        let states = useSelector((state)=>{ return state })
        console.log(states) // => 모든 state 오브젝트로 담겨있음
        console.log(states.state이름) // => 해당 이름 state가 찍힘
        ...
    }
    ```

#### useSelector 편하게 쓰려면
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
