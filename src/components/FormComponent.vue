<template>
    <form @submit.prevent="handleSubmit">
        <header>
            <h1 :class="activeLink === 'sign-up' ? 'active-link form__title sign-up' : 'form__title sign-up'">
                <RouterLink to="/sign-up">Sign Up</RouterLink>
            </h1>
            <h1 :class="activeLink === 'sign-in' ? 'active-link form__title sign-in' : 'form__title sign-in'">
                <RouterLink to="/sign-in">Sign In</RouterLink>
            </h1>
        </header>
        <div v-if="activeLink === 'sign-up'">
            <label for="first-name">First Name</label>
            <div class="input-wrapper" >
                <input type="text" id="first-name" placeholder="First Name" v-model="state.firstName" required />
                <i class='bx bxs-user'></i>
            </div>
        </div>
        <div v-if="activeLink === 'sign-up'">
            <label for="last-name">Last Name</label>
            <div class="input-wrapper">
                <input type="text" id="last-name" placeholder="Last Name" v-model="state.lastName" required />
                <i class='bx bxs-user'></i>
            </div>
        </div>
        <div>
            <label for="email">Email</label>
            <div class="input-wrapper">
                <input type="email" id="email" placeholder="Email address" v-model="state.email" required />
                <i class='bx bxs-envelope'></i>
            </div>
        </div>
        <div>
            <label for="password">Password</label>
            <div class="input-wrapper">
                <input :type="passwordType" id="password" placeholder="Password" v-model="state.password" required />
                <i class='bx bxs-lock-alt'></i>
                <i class='bx bx-show' @click="passwordType = 'text'" v-show="passwordType === 'password'"></i>
                <i class='bx bx-low-vision' @click="passwordType = 'password'" v-show="passwordType === 'text'"></i>
            </div>
        </div>
        <button class="sign-up__btn">{{ activeLink === 'sign-up' ? state.loading === true ? 'Signing up...' : 'Sign Up' : state.loading
            === true ? 'Signing in...' : 'Sign In' }}</button>
        <p class="small-text" style="color: red; text-align: center;" v-if="state.errorMessage">{{ state.errorMessage }}</p>
        <div class="small-text" v-if="activeLink === 'sign-in'">
            <RouterLink to="/forgot-password"><small>Forgot Password?</small></RouterLink>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { db, auth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'

const props = defineProps({
    activeLink: {
        type: String,
        required: true
    }
})

const router = useRouter();

const passwordType = ref('password');

const state = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errorMessage: '',
    loading: false,
})

const registerUser = async () => {
    try {
        const createdUser = await createUserWithEmailAndPassword(auth, state.email, state.password);
        const newUser = await createdUser;
        // console.log(newUser);
        const userRef = doc(db, 'users', newUser.user.uid)
        await setDoc(userRef, {
            email: state.email,
            firstName: state.firstName,
            lastName: state.lastName,
        })
        state.loading = false;
        router.push('/sign-in');
    } catch (error: any) {
        state.loading = false;
        console.log(error);
        if (error.message.includes("email-already-in-use")) {
            console.log("Email already in use");
            state.errorMessage = "Email already in use";
            state.password = "";
            setTimeout(() => {
                state.errorMessage = "";
            }, 3000);
        } else if (error.message.includes("weak-password")) {
            console.log("Weak password");
            state.errorMessage = "Password should be at least 6 characters";
            state.password = "";
            setTimeout(() => {
                state.errorMessage = "";
            }, 3000);
        }
    }

        // .then(userCredential => {
        //     state.loading = false;
        //     // Signed up
        //     const user = userCredential.user;
        //     console.log(user);
        //     router.push('/sign-in');
        // })
        // .catch(err => {
        //     state.loading = false;
        //     console.log(err.message);
        //     if (err.message.includes("email-already-in-use")) {
        //         console.log("Email already in use");
        //         state.errorMessage = "Email already in use";
        //         setTimeout(() => {
        //             state.errorMessage = "";
        //         }, 3000);
        //     } else if (err.message.includes("weak-password")) {
        //         console.log("Weak password");
        //         state.errorMessage = "Password should be at least 6 characters";
        //         setTimeout(() => {
        //             state.errorMessage = "";
        //         }, 3000);
        //     }
        // })
}

const logInUser = () => {
    signInWithEmailAndPassword(auth, state.email, state.password)
        .then(userCredential => {
            state.loading = false;
            // Signed in 
            const user = userCredential.user;
            // console.log(user);
            router.push('/dashboard');
        })
        .catch(err => {
            state.loading = false;
            // console.log(err.message);
            if (err.message.includes("user-not-found")) {
                console.log("User not found");
                state.errorMessage = "User does not exist";
                setTimeout(() => {
                    state.errorMessage = "";
                }, 3000);
            } else if (err.message.includes("wrong-password")) {
                console.log("Wrong password");
                state.errorMessage = "Incorrect password";
                setTimeout(() => {
                    state.errorMessage = "";
                }, 3000);
            } else {
                console.log(err.message);
            }
        })
}

const handleSubmit = () => {
    if (props.activeLink === 'sign-up') {
        state.loading = true;
        // console.log(state.email, state.password, state.lastName, state.firstName)
        registerUser();

    } else {
        state.loading = true;
        logInUser();

    }
}

</script>

<style scoped>
form {
    width: 350px;
    padding: 13px 23px;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

header {
    display: flex;
    gap: 1rem;
    margin-bottom: 35px;
}

.form__title {
    position: relative;
    font-weight: 600;
    cursor: pointer;
    color: #aea8cc;
}

.active-link {
    color: var(--dark-blue);
}

.active-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 28px;
    height: 2px;
    border-radius: 3px;
    background-color: var(--dark-blue);
    animation: active-link-slide;
    animation-duration: 0.5s;
    animation-timing-function: linear;
}

@keyframes active-link-slide {
    0% {
        width: 0px;
    }

    100% {
        width: 28px;
    }
}

input {
    background: #dfdfe0;
    border: 0;
    border-radius: 8px;
    width: 100%;
    font-size: 0.7rem;
    text-indent: 20px;
    padding: 8px;
}

input::placeholder {
    font-size: 13px;
}

input:focus {
    outline: none;
}

form > div {
    margin-bottom: 1rem;
}

.input-wrapper {
    position: relative;
}

.bxs-user, .bxs-envelope,
.bxs-lock-alt {
    position: absolute;
    top: 8px;
    left: 7px;
    color: rgb(74, 68, 68);
}

.bx-show, .bx-low-vision {
    position: absolute;
    top: 8px;
    right: 7px;
    color: rgb(74, 68, 68);
    cursor: pointer;
}

label {
    display: block;
    font-size: var(--normal-font-size);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.sign-up__btn {
    width: 100%;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: var(--small-font-size);
    font-weight: var(--font-normal);
    transition: all 0.25s;
    background-color: var(--dark-blue);
    color: white;
    margin-bottom: 20px;
    margin-top: 1rem;
}

.sign-up__btn:hover {
    background-color: var(--dark-blue-hover);
    font-weight: var(--font-medium);
}

.small-text {
    text-align: center;
}

@media screen and (max-width: 800px) {
    form {
        width: 300px;
        padding: 22px;
    }

    header {
        margin-bottom: 25px;
    }
    .form__title {
        font-size: var(--h3-font-size);
    }

    input::placeholder {
        font-size: 11px;
    }

    .bxs-envelope, .bxs-lock-alt {
        top: 8px;
    }

    label {
        font-size: 0.8rem;
        margin-bottom: 0.4rem;
    }

    .sign-up__btn {
        padding: 0.4rem 0.8rem;
    }
}

@media screen and (max-width: 768px) {
    form {
        padding: 20px;
    }

    .small-text {
        font-size: 0.8rem;
    }

    label {
        margin-bottom: 0.3rem;
    }
}

@media screen and (max-width: 425px) {
    form {
        width: 280px;
        padding: 18px;
    }

    header {
        margin-bottom: 20px;
    }

    .form__title {
        font-size: var(--h4-font-size);
    }

    input {
        font-size: 0.6rem;
        text-indent: 15px;
        padding: 7px;
    }

    input::placeholder {
        font-size: 11px;
    }

    .bxs-user, .bxs-envelope, .bxs-lock-alt {
        top: 8px;
        left: 5px;
        font-size: small;
    }

    label {
        font-size: 0.9rem;
        margin-bottom: 0.2rem;
    }

    form > div {
        margin-bottom: 0.6rem;
    }

    form > div:nth-child(5) {
        margin-bottom: 1rem;
    }

    .sign-up__btn {
        padding: 0.4rem 0.6rem;
        font-size: 0.8rem;
    }

    .small-text {
        font-size: 0.8rem;
    }
}
</style>