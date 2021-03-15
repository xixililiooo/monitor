<template>
  <div id="population"> 
    <VmHeader></VmHeader>
    <div id="content">
      <VmCenter class="center" :centerTop="centerTop">
      </VmCenter>
    </div>
  </div>
</template>

<script>
import VmHeader from "components/VmHeader.vue";
import VmCenter from "components/VmCenter.vue";
export default {
  data() {
    return {
      centerTop: {},
    };
  },
  methods: {},
  components: {
    VmHeader,
    VmCenter,
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


li {
  list-style: none;
}
#population {
  /* height: 100vh; */
  width: calc(100vw - 17px);
  /* height: 100vh; */
  background: url(../assets/image/bg.jpg) top center;
}
#content {
  /* width: 100vw; */
  /* height: 100px; */
  /* background-color: pink; */
  padding: 10px 10px 0;
  display: flex;
}
#content .left {
  flex: 3;
}
#content .center {
  flex: 5;
}
#content .right {
  flex: 3;
}
</style>
