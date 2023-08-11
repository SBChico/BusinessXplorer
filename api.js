const registrationForm = document.getElementById("register-form");

const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(registrationForm);
    console.log(Array.from(data));
    try {
        const result = await fetch("http://localhost:3000/submit-job-seeker", {
            method: "POST",
            body: data
        });

        if(result.ok){
            
            console.log(result, "Okay");
        }else {
            console.log(result, "Not okay");

        }
        
    } catch (error) {
        console.log("Error: ", error);
    }
}

registrationForm.addEventListener("submit", handleLogin)