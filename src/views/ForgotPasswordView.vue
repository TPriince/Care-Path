<template>
    <section class="form-section">
        <div class="left-container">
            <div class="img-container">
                <img src="../assets/images/hero-image1.png" loading="lazy" />
            </div>
        </div>
        <div class="form-wrapper">
            <form @submit.prevent="resetPassword">
                <header>
                    <h1 class="form__title sign-in">Forgot Password</h1>
                </header>
                <div>
                    <label for="email">Email</label>
                    <div class="input-wrapper">
                        <input type="email" id="email" v-model="email" placeholder="Email address" required />
                        <i class='bx bxs-envelope'></i>
                    </div>
                </div>
                <button class="reset-btn">Reset Password</button>
                <p v-if="errorMsg" class="small-text" style="color: red; text-align: center;">{{ errorMsg }}</p>
                <div class="small-text">
                    <RouterLink to="/sign-in"><small>Back to Log In</small></RouterLink>
                </div>
            </form>
        </div>
        <LoaderComponent v-if="loading" />
        <ModalComponent v-if="show" :message="successMsg" @close="clearModal" />
    </section>
</template>

<script lang="ts">
import LoaderComponent from '../components/LoaderComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import { defineComponent, reactive, toRefs } from 'vue';
import { auth } from '../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

export default defineComponent({
    name: 'ForgotPasswordView',
    components: {
        LoaderComponent,
        ModalComponent,
    },
    setup() {
        const state = reactive({
            email: '',
            loading: false,
            successMsg: '',
            errorMsg: '',
            show: false
        })

        const clearModal = () => {
            state.email = '';
            state.show = false;
        }

        const resetPassword = async () => {
            state.loading = true
            try {
                await sendPasswordResetEmail(auth, state.email)
                state.loading = false;
                state.successMsg = 'Password reset email sent! <span style="color: green;">✔<span>'
                state.show = true
            } catch (err: any) {
                state.loading = false;
                state.errorMsg = err.message;
                setTimeout(() => {
                    state.errorMsg = '';
                }, 3000);
            }
        }

        return {
            clearModal,
            ...toRefs(state),
            resetPassword
        }
    }
})
</script>

<style scoped>
form {
    width: 350px;
    padding: 13px 23px;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

header {
    margin-bottom: 35px;
}

.form__title {
    position: relative;
    font-weight: 600;
    cursor: pointer;
    color: #aea8cc;
    color: var(--dark-blue);
}

.form__title::after {
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
    font-size: 0.9rem;
    text-indent: 22px;
    padding: 10px;
}

input::placeholder {
    font-size: 0.9rem;
}

input:focus {
    outline: none;
}

form > div {
    margin-bottom: 1.5rem;
}

.input-wrapper {
    position: relative;
}

.bxs-envelope {
    position: absolute;
    top: 12px;
    left: 8px;
    color: rgb(74, 68, 68);
}

label {
    display: block;
    font-size: var(--normal-font-size);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.reset-btn {
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

.reset-btn:hover {
    background-color: var(--dark-blue-hover);
    font-weight: var(--font-medium);
}

.small-text {
    text-align: center;
}

@media screen and (max-width: 800px) {
    form {
        width: 320px;
        padding: 22px;
    }

    header {
        margin-bottom: 25px;
    }
}

@media screen and (max-width: 768px) {
    form {
        width: 300px;
        padding: 21px;
    }

    .small-text {
        font-size: 0.9rem;
    }

    label {
        margin-bottom: 0.4rem;
    }
}

@media screen and (max-width: 425px) {
    form {
        width: 350px;
        padding: 20px;
    }

    header {
        margin-bottom: 20px;
    }

    .form__title {
        font-size: var(--h3-font-size);
    }

    form > div {
        margin-bottom: 1rem;
    }
    .small-text {
        font-size: 0.8rem;
    }
}
</style>