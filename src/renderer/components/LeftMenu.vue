<template>
  <div class="menu-wrapper">
    <div class="left-menu">
      <div class="menu-content">
        <div class="button-wrapper">
            <font-awesome-icon icon="cogs" width="24" height="24" />
        </div>
        <div class="button-wrapper">
            <font-awesome-icon icon="user-cog" width="24" height="24" />
        </div>
        <div class="button-wrapper">
            <font-awesome-icon icon="users-cog" width="24" height="24" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mrLeftMenu"
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  display: flex;

  .left-menu {
    width: 75px;
    background: #6610f2;
    display: flex;
    font-weight: lighter;
    height: 100%;
    padding: 50px 25px;

    .menu-content {
        display: flex;
        flex-direction: column;
        height: 75%;
        justify-content: space-between;
        width: 100%;
        max-height: 250px;

        .button-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            font-size: 18px;
            margin: 0;
            padding: 0;
            color: rgba(233, 232, 232, 1);

            &:hover {
                color: #fff;
            }
        }
    }
  }
}
</style>
