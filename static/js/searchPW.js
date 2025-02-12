document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const resultDiv = document.getElementById("result"); // 결과 출력할 div 가져오기

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // 기본 동작 중단
        const emailInput = document.querySelector('input[name="email"]').value;

        const users = JSON.parse(localStorage.getItem("data_map")) || [];

        const foundUser = users.find(x => x.email === emailInput);

        if (foundUser) {
            resultDiv.innerText = `비밀번호는 ${foundUser.password}입니다!`;
        } else {
            resultDiv.innerText = "등록되지 않은 이메일입니다.";
        }
    });
});
