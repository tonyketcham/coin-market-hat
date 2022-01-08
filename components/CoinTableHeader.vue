<template>
  <thead class="sticky top-22 text-sm header-grill backdrop-blur-[3px] z-10">
    <th
      v-for="column of tableHeaders"
      :key="column.title"
      :title="column.tip ? column.tip as string : ''"
      scope="col"
      :aria-sort="getAriaSort(column)"
    >
      <button
        class="flex place-items-center"
        :class="{
          'flex-row-reverse': column.align === 'left',
          'ml-auto': column.align === 'right',
          'sr-only': column.isLabelSrOnly,
        }"
        @click="sort(column)"
      >
        <template v-if="column.field === interactions.coinSortField">
          <span
            class="i-carbon-play-filled-alt inline-block text-current transform scale-60"
            :class="[interactions.coinSortAscending ? '-rotate-90' : 'rotate-90']"
          >
          </span>
        </template>

        <span class="block font-bold">
          {{ column.title }}
        </span>
      </button>
    </th>
  </thead>
</template>

<script setup lang="ts">
  import type { Ref } from 'vue';
  import type { TableColumn } from '@/types';
  import { useInteractionStore } from '@/stores/interactions';

  const interactions = useInteractionStore();

  /**
   * Column names and their configuration for the UI.
   * Columns default to sortable and visible by all users.
   */
  const tableHeaders = ref([
    {
      title: 'Favorite',
      align: 'left',
      isLabelSrOnly: true,
      unsortable: true,
    },
    {
      title: '#',
      field: 'market_cap_rank',
      align: 'left',
    },
    {
      title: 'Name',
      field: 'name',
      align: 'left',
    },
    {
      title: 'Price',
      field: 'current_price',
      align: 'right',
    },
    {
      title: '24h %',
      field: 'price_change_percentage_24h',
      align: 'right',
    },
    {
      title: 'ATH',
      field: 'ath',
      tip: 'All Time High',
      align: 'right',
    },
    {
      title: 'Market Hat',
      field: 'market_cap',
      align: 'right',
    },
    {
      title: 'Total Volume',
      field: 'total_volume',
      align: 'right',
    },
  ]) as Ref<TableColumn[]>;

  /**
   * Set shared state to sort the table by the given column.
   *
   * @param column The column to sort by.
   */
  function sort(column: TableColumn) {
    if (column.unsortable || !column.field) return;
    interactions.coinSortField = column.field;
    interactions.coinSortAscending = !interactions.coinSortAscending;
  }

  /**
   * Get the aria-sort value for the given column.
   * @param column column to get aria sort value for
   */
  function getAriaSort(column: TableColumn) {
    if (column.unsortable || !column.field) return 'none';
    return interactions.coinSortField === column.field
      ? interactions.coinSortAscending
        ? 'ascending'
        : 'descending'
      : 'none';
  }
</script>
