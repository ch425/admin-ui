<template>
  <div>
    <vue-canvas-nest style="opacity: 0.5"></vue-canvas-nest>

    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[ 'userName', { rules: [{ required: true, message: 'Please input your username!' }] }]"
          placeholder="请输入用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[ 'password', { rules: [{ required: true, message: 'Please input your Password!' }] }]"
          type="password"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <div class="check-code-wrapper">
          <div class="yanzhengma-wrapper">
            <a-input
              size="large"
              v-decorator="[ 'code', { rules: [{ required: true, message: 'Please input your Code!' , validator: checkYanzhengma}] }]"
              type="text"
              placeholder="请输入验证码"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </div>
          <div class="validate-code-wrapper">
            <validateCode ref="validate-code" @change="_setCheckCode"></validateCode>
          </div>
        </div>
      </a-form-item>
      <a-button size="large" type="primary" class="btn" html-type="submit" block>登录</a-button>
    </a-form>
  </div>
</template>

<script>
import vueCanvasNest from "vue-canvas-nest";
import validateCode from "@/components/ValidateCode/index";
export default {
  components: {
    vueCanvasNest,
    validateCode
  },
  data() {
    var checkYanzhengma = (rule, value, callback) => {
      value = value.toUpperCase();
      this.code = value;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value.length > 3 && value !== this.checkCode) {
        callback(new Error("验证码错误"));
        // this.$refs["validate-code"].draw();      // 重新渲染
      } else {
        callback();
      }
    };
    return {
      checkCode: "",
      code: "",
      checkYanzhengma
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.code != this.checkCode) {
        this.$message.error("验证码错误,请重新输入");
        this.$refs["validate-code"].draw();
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$router.push({
              path: '/'
          })
        }
      });
    },
    _setCheckCode(value) {
      this.checkCode = value;
    }
  }
};
</script>

<style>
.login-form {
  width: 350px;
  height: 350px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
}
.check-code-wrapper {
  display: flex;
  justify-content: space-between;
  height: 40px;
}
.yanzhengma-wrapper {
  flex: 0 1 auto;
}

.validate-code-wrapper {
  flex: 0 0 160px;
  margin-left: 10px;
}
.btn {
  margin-top: 50px;
}
</style>