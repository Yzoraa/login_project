document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const resultDiv = document.getElementById("result"); // 결과 출력할 div 가져오기

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // 기본 동작 중단

        const telInputs = document.querySelectorAll('input[name="tel"]');
        const telInput = Array.from(telInputs).map(input => input.value).join("-");

        const users = JSON.parse(localStorage.getItem("data_map")) || [];
        const foundUser = users.find(x => x.tel === telInput);

        if (foundUser) {
            resultDiv.innerText = `이메일은 ${foundUser.email}입니다!`;
        } else {
            resultDiv.innerText = "등록되지 않은 휴대폰 번호입니다.";
        }
    });
});
