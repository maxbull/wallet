<template>
  <v-flex xs12 :lg8="!showDetails" :offset-lg2="!showDetails">
    <v-card color="primary">
      <v-card-text>
        <v-layout align-center justify-center wrap>
          <v-flex class="display-1 white--text font-weight-black" xs12 text-xs-center mb-3>{{ token.tokenId }}</v-flex>
          <v-flex xs12 text-xs-center>
            <div class="total-balance">
              <img class="balance-icon" src="@/assets/img/coin-yellow.png" />
              <div class="secondary--text display-1 font-weight-bold">{{ totalBalance }} {{ symbol }}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions class="no-padding-top">
        <v-spacer></v-spacer>
        <v-btn icon @click="showDetails = !showDetails">
          <v-icon>{{ showDetails ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-sheet v-show="showDetails">
        <v-container>
          <v-layout wrap>
            <v-flex xs2 my-2 class="secondary--text font-weight-bold">Chain ID</v-flex>
            <v-flex xs10 my-2 pl-3>{{ token.chainId }}</v-flex>
            <v-flex xs2 my-2 class="secondary--text font-weight-bold">Issuer</v-flex>
            <v-flex xs10 my-2 pl-3>{{ token.issuer }}</v-flex>

            <TokenSupplyDetails :chainId="token.chainId" :symbol="symbol"></TokenSupplyDetails>
            <template v-if="token.metadata">
              <v-flex xs2 my-2 class="secondary--text font-weight-bold">Metadata</v-flex>
              <v-flex xs10 my-2 pl-3>
                <v-icon color="primary" @click="showMetadata">visibility</v-icon>
              </v-flex>
            </template>
            <v-flex xs12 text-xs-right>
              <v-btn color="primary" flat outline @click="untrack">stop tracking</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-sheet>
    </v-card>
    <ShowMetadataDialog
      ref="showMetadataDialog"
      :tokenId="token.tokenId"
      :metadata="token.metadata"
    ></ShowMetadataDialog>
  </v-flex>
</template>

<script>
import TokenSupplyDetails from '@/components/TokenSupplyDetails';
import ShowMetadataDialog from './ShowMetadataDialog';

export default {
  name: 'TokenHeader',
  components: { TokenSupplyDetails, ShowMetadataDialog },
  data() {
    return {
      showDetails: false
    };
  },
  props: ['token', 'totalBalance'],
  computed: {
    symbol() {
      return this.token.symbol || '';
    }
  },
  methods: {
    untrack() {
      this.$store.dispatch('tokens/untrack', this.token.chainId);
      this.$router.push({ name: 'TrackToken' });
    },
    showMetadata() {
      this.$refs.showMetadataDialog.show();
    }
  }
};
</script>

<style scoped>
.balance-icon {
  margin-right: 16px;
}
.total-balance {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
}
.clickable {
  cursor: pointer;
}
.no-padding-top {
  padding-top: 0 !important;
}
</style>
