fetch("/userinfo")
    .then((response) => response.json())
    .then((data) => {
        let data_map = JSON.parse(localStorage.getItem("data_map")) || [];

        const form = document.querySelector("form");
        const resultPwd = document.getElementById("result-pwd");
        const resultPwdCheck = document.getElementById("result-pwdcheck");

        // 이메일 중복 확인 함수
        checkEMAIL.addEventListener("click", () => {
            const emailInput = document.querySelector('input[name="email"]').value;
            const isDuplicate = data_map.some(user => user.email === emailInput);
            
            if (isDuplicate) {
                alert("이미 사용 중인 이메일입니다.");
            } else {
                alert("사용 가능한 이메일입니다.");
            }
        });

        // 비밀번호 입력 함수
        function validatePassword() {
            const pwdInput = document.querySelector('input[name="pwd"]').value; // 여기서 매번 새로 가져오기
            console.log("현재 비번:", JSON.stringify(pwdInput));  // 값 확인
            
            // 비밀번호 정규식 패턴 (모든 특수문자 허용)
            const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~]).{8,}$/;
            
            if (!pwdPattern.test(pwdInput)) {
                resultPwd.textContent = "비밀번호는 최소 8자 이상이며, 대/소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.";
                resultPwd.style.color = "red";
                return false;
            } else {
                resultPwd.textContent = "";
                return true;
            }
        }

        // 비밀번호 일치 검증 함수
        function validatePasswordCheck() {
            const pwdInput = document.querySelector('input[name="pwd"]').value;
            const pwdcheckInput = document.querySelector('input[name="pwdcheck"]').value;

            if (pwdInput !== pwdcheckInput) {
                resultPwdCheck.textContent = "비밀번호가 일치하지 않습니다.";
                resultPwdCheck.style.color = "red";
                return false;
            } else {
                resultPwdCheck.textContent = "";
                return true;
            }
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const pwdValid = validatePassword();
            const pwdCheckValid = validatePasswordCheck();
            if (!pwdValid || !pwdCheckValid) return;

            const emailInput = document.querySelector('input[name="email"]').value;
            const usernameInput = document.querySelector('input[name="username"]').value;
            const genderInput = document.querySelector('input[name="gender"]:checked')?.value || "";
            const telInputs = document.querySelectorAll('input[name="tel"]');
            const birthInput = document.querySelector('input[name="birth"]').value;
            const telNumber = Array.from(telInputs).map(input => input.value).join("-");

            const isDuplicate = data_map.some(user => user.email === emailInput);
            if (isDuplicate) {
                alert("중복된 이메일 입니다.");
                return;
            }

            const newUser = {
                email: emailInput,
                username: usernameInput,
                gender: genderInput,
                tel: telNumber,
                birth: birthInput,
                password: document.querySelector('input[name="pwd"]').value
            };

            data_map.push(newUser);
            localStorage.setItem("data_map", JSON.stringify(data_map));

            alert("회원가입이 완료되었습니다.");
            form.reset();
        });

        document.querySelector('input[name="pwd"]').addEventListener("input", validatePassword);
        document.querySelector('input[name="pwdcheck"]').addEventListener("input", validatePasswordCheck);
    })
    .catch((error) => {
        console.error("error", error);
    });
