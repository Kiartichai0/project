<template>
<div align="center">
  <v-card class="my-5" width="80%">
    <v-card-title class="justify-center"> ลงทะเบียน </v-card-title>
    <v-form ref="form" @submit.prevent="submit" >
      <v-container fluid>
        <v-row class="col-8" >
          <v-col cols="12" >
            <v-text-field v-model="form.username" :rules="rules.name" label="ชื่อผู้ใช้" required ></v-text-field>
          </v-col>
          <v-col cols="12" >
            <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" counter @click:append="show1 = !show1" v-model="form.password1" :rules="rules.name" label="รหัสผ่าน" required ></v-text-field>
          </v-col>

          <v-col cols="12" >
            <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" counter @click:append="show2 = !show2" v-model="form.password2" :rules="rules.password" label="ยืนยันรหัสผ่าน" required ></v-text-field>
          </v-col>
          
          <v-col cols="12" sm="6" >
            <v-text-field v-model="form.first" :rules="rules.name" label="ชื่อ" required ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" >
            <v-text-field v-model="form.last" :rules="rules.name" label="นามสกุล" required ></v-text-field>
          </v-col>

          <v-col cols="12" >
            <v-avatar v-if="form.pic != '' " size="100"> <img :src="form.pic" alt="avatar"/> </v-avatar>
            <v-text-field v-model="form.pic" label="รูป Profile" ></v-text-field>
          </v-col>
          
          <v-col cols="12">
            <v-textarea v-model="form.bio" color="teal" >
              <template v-slot:label>
                <div>
                  ประวัติส่วนตัว <small>(optional)</small>
                </div>
              </template>
            </v-textarea>
          </v-col>

          <v-col cols="12" >
            <v-select v-model="form.role" :items="roles" :rules="rules.role" label="บทบาท" required ></v-select>
          </v-col>
          
          <v-col cols="12">
            <v-checkbox v-model="form.terms" color="green" >
              <template v-slot:label>
                <div @click.stop="">
                  คุณจะยอมรับ
                  <a href="#" @click.prevent="terms = true" >ข้อตกลง</a>
                  และ
                  <a href="#" @click.prevent="conditions = true" >เงื่อนไข</a>
                  หรือไม่
                </div>
              </template>
            </v-checkbox>
          </v-col>

        </v-row>
      </v-container>

      <v-card-actions class="justify-center">
        <v-btn :disabled="!formIsValid" text color="primary" type="submit" > บันทึก </v-btn>
        <v-btn text to="/login/login" > กลับ </v-btn>
      </v-card-actions>
    </v-form>

    <v-dialog v-model="terms" width="70%" >
      <v-card>
        <v-card-title class="text-h6"> ข้อตกลง </v-card-title>
        <v-card-text v-for="n in 5" :key="n" > {{ content }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="terms = false" > ตกลง </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="conditions" width="70%" >
      <v-card>
        <v-card-title class="text-h6"> เงื่อนไข </v-card-title>
        <v-card-text v-for="n in 5" :key="n" > {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="conditions = false" >  ตกลง  </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  </div>
</template>
<script>
  export default {
    data () {

      return {
        form: {
          first: '',
          last: '',
          bio: '',
          role: '',
          pic: '',
          username: '',
          password1: '',
          password2: '',
          terms: false,
        },
        rules: {
          password: [val => (val == this.form.password1) || 'จำเป็นต้องกรอก password ให้ตรงกัน'],
          role: [val => (val || '').length > 0 || 'จำเป็นต้องกรอกช่องนี้'],
          name: [val => (val || '').length > 0 || 'จำเป็นต้องกรอกช่องนี้'],
        },
        roles: ['Writer', 'User'],
        conditions: false,
        content: 'นี่คือเงื่อนไขการเป็นสมาชิก',
        terms: false,
        show1:false,
        show2:false,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.role &&
          this.form.username &&
          this.form.password1 &&
          this.form.password2 &&
          this.form.terms
        )
      },
    },

    methods: {
      async submit () {
        const payload = {
        data:{
          username: this.form.username,
          password: this.form.password1,
          role: this.form.role,
          avatar: this.form.pic,
          firstname: this.form.first,
          lastname: this.form.last,
          bio: this.form.bio,
          id: (Math.random() + 1).toString(36).substring(2),
        }
     
      };
      await this.$axios.$post("/register", payload);
      await this.$router.push("/login/login");
      },
    },
  }
</script>