<template>
    <div>
        <v-card class="mx-auto">
            <v-card-title> {{this.$route.query.t}} </v-card-title>

            <!--v-card-subtitle> SUB-TOPIC </v-card-subtitle>
            
            <v-card-text>
                &emsp;&emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ipsum risus, viverra vel elementum vitae, commodo feugiat massa. Maecenas in dui ultrices nisl fermentum blandit. Phasellus maximus velit ut nisl luctus, sodales dignissim ligula sagittis. Vestibulum nec velit ut diam pharetra dapibus malesuada at risus. Quisque posuere vehicula velit. Maecenas ullamcorper tellus eros, venenatis aliquet leo eleifend a. Fusce cursus lorem at volutpat porttitor. In aliquet eu tellus in imperdiet. Fusce tincidunt urna magna. Proin tempus tellus et arcu convallis rutrum. Fusce non venenatis lorem. Proin libero est, consectetur non diam et, accumsan iaculis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque consequat mi risus, nec tincidunt ante fringilla vitae.

                <br/><br/>&emsp;&emsp;Donec faucibus sapien eget diam volutpat maximus. Nulla eu congue velit, nec ornare libero. Ut congue enim eu nibh interdum, sit amet molestie nunc tincidunt. Sed consequat risus ut posuere venenatis. Aenean vehicula quis enim eget cursus. Proin pretium neque non nibh placerat vestibulum. Nunc pulvinar tellus sit amet blandit accumsan. Aenean mollis id odio nec interdum. Mauris elementum imperdiet eleifend. Etiam at elit consequat, molestie mauris vitae, sagittis turpis.

                <br/><br/>&emsp;&emsp;Maecenas id ante vel eros luctus consequat id quis nisi. Etiam eget egestas felis, a vestibulum leo. Cras in consectetur arcu. Etiam sollicitudin posuere sem, sit amet rutrum tellus congue id. Cras quis mauris quam. Pellentesque luctus augue ut suscipit aliquet. Nam volutpat lacus purus, ut interdum felis placerat quis. Phasellus urna felis, blandit in justo quis, lacinia volutpat ligula. Aenean iaculis nisi nec risus sagittis vestibulum.

                <br/><br/>&emsp;&emsp;Sed convallis velit eros, ut sagittis eros elementum non. Sed lacus tellus, lobortis et blandit eget, semper sit amet turpis. Suspendisse congue mattis leo, at bibendum neque blandit vel. Quisque mollis nisl sem, vel volutpat nunc placerat in. Proin interdum mauris nec mi placerat, et congue velit commodo. Nulla sed dictum ipsum. Aenean pharetra nunc et magna commodo convallis. Fusce elementum et nunc vitae auctor. Maecenas accumsan ex ligula, a ultricies quam interdum in. Aliquam erat volutpat. Ut imperdiet sem a diam tristique viverra. Fusce eu ligula est. Maecenas eget nisi id ipsum ultrices viverra vel vel elit.

                <br/><br/>&emsp;&emsp;Donec feugiat tempor erat, id convallis tortor pulvinar ut. Mauris a lobortis justo. Aenean malesuada rhoncus est, eu eleifend purus. Donec non nibh risus. Duis metus purus, feugiat id nunc non, rhoncus accumsan lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris sed diam nulla. Morbi lacinia dui tellus, vitae pharetra ex sollicitudin eget. Nunc commodo purus vitae sapien dictum tincidunt. Phasellus mi sem, pharetra id velit vel, efficitur rhoncus quam. Duis blandit, lacus vel sagittis fringilla, odio orci tincidunt tellus, ac accumsan odio nisi sed diam.
            </v-card-text-->
            <center><v-img :src = "img" height="400" width="600" align="center" ></v-img></center>
            <v-card-text> {{content}} </v-card-text>
            <div v-html="info"/>

            <v-card-actions class=" justify-space-between ">

                <v-btn class=" pa-5" :to="{ path: '/user/user_topic', query: { subject:subject ,title:title} }"> back </v-btn>
                <v-btn class=" pa-5"> next </v-btn>

            </v-card-actions>

        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
        user: this.$auth.user,
        loggedIn: this.$auth.loggedIn,

        subject: this.$route.query.subject,
        content: this.$route.query.content,
        title: this.$route.query.title,
        img: this.$route.query.img,
        info: this.$route.query.info,
        };
    },
}
</script>