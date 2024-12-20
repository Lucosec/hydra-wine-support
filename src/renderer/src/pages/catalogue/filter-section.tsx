import { CheckboxField, TextField } from "@renderer/components";
import { useFormat } from "@renderer/hooks";
import { useCallback, useMemo, useState } from "react";

import List from "rc-virtual-list";

export interface FilterSectionProps<T extends string | number> {
  title: string;
  items: {
    label: string;
    value: T;
    checked: boolean;
  }[];
  onSelect: (value: T) => void;
  color: string;
}

export function FilterSection<T extends string | number>({
  title,
  items,
  color,
  onSelect,
}: FilterSectionProps<T>) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (search.length > 0) {
      return items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      );
    }

    return items;
  }, [items, search]);

  const onSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const { formatNumber } = useFormat();

  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: color,
            borderRadius: "50%",
          }}
        />
        <h3
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "#fff",
          }}
        >
          {title}
        </h3>
      </div>

      <span style={{ fontSize: 12, marginBottom: 12, display: "block" }}>
        {formatNumber(items.length)} disponíveis
      </span>

      <TextField
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        value={search}
        containerProps={{ style: { marginBottom: 16 } }}
        theme="dark"
      />

      <List
        data={filteredItems}
        height={28 * (filteredItems.length > 10 ? 10 : filteredItems.length)}
        itemHeight={28}
        itemKey="value"
        styles={{
          verticalScrollBar: {
            backgroundColor: "rgba(255, 255, 255, 0.03)",
          },
          verticalScrollBarThumb: {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
          },
        }}
      >
        {(item) => (
          <div key={item.value} style={{ height: 28, maxHeight: 28 }}>
            <CheckboxField
              label={item.label}
              checked={item.checked}
              onChange={() => onSelect(item.value)}
            />
          </div>
        )}
      </List>
    </div>
  );
}
