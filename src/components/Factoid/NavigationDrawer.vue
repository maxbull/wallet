<template>
  <NavigationDrawer :items="items">
    <v-flex text-xs-center class="title">
      FCT & EC
    </v-flex>
  </NavigationDrawer>
</template>

<script>
import NavigationDrawer from '@/components/NavigationDrawer';

export default {
  components: { NavigationDrawer },
  data() {
    return {
      items: [
        { text: 'Info' },
        { text: 'Addresses & Balances', icon: 'account_balance_wallet', to: 'addresses' },
        { text: 'Transaction History', icon: 'history', to: 'history' },
        { text: 'Actions' },
        { text: 'Send FCT', icon: 'send', to: 'send' },
        { text: 'Send FCT (Advanced)', icon: 'fas fa-cogs', to: 'send-advanced' },
        { text: 'Convert FCT to EC', icon: 'local_play', to: 'convert' }
      ]
    };
  }
};
</script>
