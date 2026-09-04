const app = new Vue({
  el: '#app',
  data: {
    msisdn: window.msisdn,
    resendOTP: false,
    phoneViewVisibility: false,
    subscribeViewVisibility: true,
    passwordViewVisibility: false,
    paymentViewVisibility: false,
    manySubsModalVisibility: false,
    subscribeSuspend: false,
    ageConfirm: false,
    errorCode: false,
    accessSectionError: '',
    isAoc: window.isAoc,
    csrfToken: window.csrfToken,
    promoterId: window.promoterId,
    promolink: window.promolink,
    otpCode: '',
    passwordIsVerified: false,
    autocompleteListenerAlreadySet: false,
    submitBtnEnabled: true,
  },
  watch: {
    otpCode(value) {
      const normalized = String(value).replace(/\D/g, '').slice(0, 4);

      if (normalized !== value) {
        this.otpCode = normalized;
      }

      if (this.errorCode) {
        this.errorCode = false;
        this.accessSectionError = '';
      }
    },
  },
  methods: {
    openManySubsModal() {
      this.manySubsModalVisibility = true;
    },
    closeManySubsModal() {
      this.manySubsModalVisibility = false;
    },
    showPhoneView() {
      this.phoneViewVisibility = true;
      this.passwordViewVisibility =
        this.subscribeViewVisibility =
        this.paymentViewVisibility =
          false;
    },
    showPasswordView() {
      this.passwordViewVisibility = true;
      this.phoneViewVisibility = this.subscribeViewVisibility = this.paymentViewVisibility = false;
    },
    showPaymentView() {
      this.paymentViewVisibility = true;
      this.phoneViewVisibility = this.subscribeViewVisibility = this.passwordViewVisibility = false;
    },
    showSubscribeView() {
      this.subscribeViewVisibility = true;
      this.phoneViewVisibility = this.passwordViewVisibility = this.paymentViewVisibility = false;
    },
    async onConfirmAge() {
      this.accessSectionError = '';
      this.submitBtnEnabled = true;
      this.ageConfirm = true;
    },
    async submitPassword() {
      if (!this.submitBtnEnabled) {
        return;
      }

      if (this.otpCode.length < 4) {
        this.errorCode = true;
        this.accessSectionError = 'Введите 4 цифры из SMS';
        return;
      }

      this.errorCode = true;
      this.accessSectionError = 'Неверный код подтверждения';
    },
    async sendOTP() {
      if (!this.submitBtnEnabled) {
        return;
      }

      this.accessSectionError = '';
      this.errorCode = false;
      this.passwordViewVisibility = true;
      this.addAutocompleteOtp();
      this.keepViewport(0);
    },
    async resendOTPCode() {
      this.otpCode = '';
      this.resendOTP = true;
      await this.sendOTP();
    },
    async finalize() {
      if (!this.submitBtnEnabled) {
        return;
      }

      this.submitBtnEnabled = false;
      document.getElementById('finalize').submit();
    },
    keepViewport(scrollTop) {
      this.$nextTick(() => {
        const restore = () => {
          if (this.$refs.sms && document.activeElement === this.$refs.sms) {
            this.$refs.sms.blur();
          }

          window.scrollTo(0, scrollTop);
        };
        const scheduleFrame = window.requestAnimationFrame || window.setTimeout;

        scheduleFrame(() => {
          restore();
          scheduleFrame(restore);
        });
        window.setTimeout(restore, 90);
      });
    },
    addAutocompleteOtp() {
      if (this.autocompleteListenerAlreadySet || !navigator.credentials) {
        return;
      }

      const ac = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        })
        .then((otp) => {
          if (otp && otp.code) {
            this.otpCode = otp.code;
            this.submitPassword();
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.autocompleteListenerAlreadySet = true;
    },
  },
  mounted() {},
});
