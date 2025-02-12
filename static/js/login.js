document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
    
        const emailInput = document.querySelector('input[name="email"]').value;
        const pwInput = document.querySelector('input[name="pw"]').value;
    
        console.log('입력된 이메일:', emailInput);
        console.log('입력된 비밀번호:', pwInput);
    
        fetch("/userinfo")
            .then((response) => response.json())
            .then((users) => {
                console.log("서버에서 가져온 사용자 목록:", users);
    
                const foundUser = users.find(x => x.email === emailInput && x.pwd === pwInput);
    
                if (foundUser) {
                    console.log('로그인 성공:', foundUser);
                    localStorage.setItem("logined", JSON.stringify(foundUser));
                    window.location.href = "/loginCheck"; 
                } else {
                    alert("로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.");
                }
            })
            .catch((error) => {
                console.error("로그인 요청 중 오류 발생:", error);
            });
    });
});
