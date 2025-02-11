fetch("/userinfo")
    .then((response) => response.json())
    .then((data) => {
        let data_map = JSON.parse(localStorage.getItem("data_map")) || []; // 기존 데이터 불러오기

        // const pwdInput = document.querySelector('input[name="pwd"]').value;
        // const pwdcheckInput = document.querySelector('input[name="pwdcheck"]').value;

        // 새로운 데이터 추가
        data.forEach(user => {
            const isDuplicate = data_map.some((x) => x.email === user.email); // 이메일 중복 불가능
            // if(pwdInput !== pwdcheckInput){
            //     return alert("비밀번호가 일치하지 않습니다.");
            // }
            if (!isDuplicate) {
                data_map.push(user);
            }        
        });
        localStorage.setItem("data_map", JSON.stringify(data_map)); // 업데이트된 데이터 다시 저장
    })
    .catch((error) => {
        console.error("error", error);
    });

