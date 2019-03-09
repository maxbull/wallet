<template>
  <v-dialog v-model="display" lazy max-width="800px" @keydown.esc="close" @keydown.enter="confirm">
    <v-card>
      <v-card-title class="headline primary white--text" primary-title>Confirm transaction</v-card-title>
      <v-card-text>
        <v-layout wrap>
          <v-flex xs12 text-xs-center class="subheading" my-2>Sending</v-flex>
          <v-flex xs12 text-xs-center class="title secondary--text" mt-2>{{amountText}} FCT</v-flex>
          <v-flex
            xs12
            text-xs-center
            class="subheading secondary--text"
            mb-2
          >(+ {{feeText}} FCT of fee)</v-flex>
          <v-flex xs12 text-xs-center class="subheading" my-2>to</v-flex>
          <v-flex xs12 text-xs-center class="title secondary--text" my-2>{{address}}</v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat outline @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="confirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["amount", "address", "fee"],
  data() {
    return {
      display: false
    };
  },
  computed: {
    amountText() {
      return typeof this.amount === "number"
        ? this.amount.toLocaleString(undefined, {
            maximumFractionDigits: 8
          })
        : "";
    },
    feeText() {
      return typeof this.fee === "number"
        ? this.fee.toLocaleString(undefined, {
            maximumFractionDigits: 8
          })
        : "";
    }
  },
  methods: {
    show() {
      this.display = true;
    },
    close() {
      this.display = false;
    },
    confirm() {
      this.$emit("confirmed");
      this.close();
    }
  }
};
</script>