const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];
// toDos 의 내용이 추가,삭제되기때문에
// const 가 아닌 let 을 사용

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
// toDos 에 저장된 값을 Key값 "todos" 로 localStorage 에 저장
// JSON.stringify를 사용해 문자열로 변환한다(위 코드의 출력값이 [a,b] 에서 ["a","b"] 이런식으로 변환)

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos(); 
};
// button 삭제기능에 대한 코드이다
// li.remove();를 먼저두어서 toDo.id 값과 
// li.id 값이 다르게 (li.id 값이 먼저삭제됨)
// 함으로 filter 메서드를 사용하여 toDo.id !== parseInt(li.id)
// 의 결과값이 false 즉 toDoa의array에서 false인값을
// 불러오지않게 하여 false인값을 제외한값을 불러옴
// 그 불러온 값을 saveToDos(); 로 저장하는 기능이다.
// 정리하자면 사용자가 X 버튼을 눌러 
// li.id 값을 지우게되는데 그때 toDo.id 값과
// 지워진 li.id값이 filter메서드의 수식 안에서 결과값이
// false 이기 때문에 X버튼을 누른 li 는 결과값array에서 
// 제외, saveToDos();로 저장하여 filter메서드로
// 제외한 결과값을 저장함.

function modiFyToDo(event) {
    const li = event.target.parentElement;
    const span = li.querySelector('span'); // 클릭한 버튼의 부모 요소의 span 찾기

    const currentValue = span.innerText;
    const input = document.createElement('input');
    input.classList.add('li');
    input.value = currentValue;
    span.style.display = 'none'; // span 요소 숨기기
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            span.innerText = input.value;
            toDos = toDos.map((toDo) => {
                if (toDo.id === parseInt(li.id)) {
                    toDo.text = input.value;
                }
                return toDo;
            });
            saveToDos();
            span.style.display = 'inline'; // 수정이 끝난 후 span 요소 표시
            input.remove();

            // 수정 버튼 다시 보이게 하기
            const modifyButton = li.querySelector('.modify');
            if (modifyButton) {
                modifyButton.classList.remove('hidden');
            }
        }
    });

    li.appendChild(input);
    input.focus();

    // 수정 버튼 숨기기
    const modifyButton = li.querySelector('.modify');
    if (modifyButton) {
        modifyButton.classList.add('hidden');
    }
}

function paintTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const button = document.createElement("button");
    button.innerText = "🗙";
    const modifybutton = document.createElement("button");
    modifybutton.classList.add("modify")
    modifybutton.innerText = "📝";
    const span = document.createElement("span");
    span.innerText = newTodo.text;

    button.addEventListener("click", deleteToDo);
    modifybutton.addEventListener("click", modiFyToDo);
    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(modifybutton);
    toDoList.appendChild(li);
};
// newTodo vaule 값 입력시 나타나는 paintTodo값 설정
// 버튼 이모지 값의 대한 EventListener 과 deleteToDo
// 로 이어지는 설정값에 대한 코드이다
// span.innerText = newTodo를 newTodo.text 로 
// 수정하였는데 위의 li.id = newTodo.id 와 함께
// text,id 값을 불러와 html에 넣기위함임



function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),

    }
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveToDos();
};
// index 안에있는 type="text"안에 내용 입력시 
// preventDefault 로 새로고침중지
// newTodo 입력값을 저장, toDoInput.value ="";
// 로 newTodo는 저장하지만 기본값은 비어있음을 설정
// push 사용해 newTodo 입력값을 toDos 배열에 추가
// newTodoObj 에 text값으로 newTodo, id값을 추가하기위해
// Date.now() 사용 이값을 todo기능에 사용하기위해
// toDos.push(newTodo)에서(newTodoObj)으로 변경
// paintTodo도 같은작업 / 이유는 toDos.push 로
// id값이 추가된 텍스트를 배열에 추가하고싶고
// 화면에출력되는것 또한 같은값을 가지고 출력해야해서.

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintTodo);
}
// setitem 으로 local strage에저장되어있는 
// JSON.stringfy 를 사용해 문자열로 변환한 결과값 을 
// JSON.parse 로 객체(여기선 배열)로 생성함
// 그값을 forEach 메서드를 사용해
// 각 배열에 paintTodo 함수를 실행 
// 새로고침전에있던 toDos 들 복원함

