<script setup lang="ts">

    import session, { login, logout } from '../stores/session'
    import { RouterLink } from 'vue-router';

</script>

<template>
    
<div class="buttons" v-if="session.user == null">
    <a class="button is-primary">
        <strong>Sign up</strong>
    </a>
    <RouterLink class="button is-light" to="login">
        Log in
    </RouterLink>
</div>
<div v-else>
    Welcome {{ session.user.name }} ({{ session.user.email }})
    (<a @click="logout()">
        Log out
    </a>)
</div>

</template>


<style scoped>
</style>