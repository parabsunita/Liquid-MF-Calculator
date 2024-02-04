import React, { useState, memo } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const VirtualizedSelect = memo(
  ({ options, value, onChange, fullWidth, className, placeholder }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const itemSize = 300; // Adjust based on your item height

    const handleItemClick = (index) => {
      onChange({ target: { value: options[index].value } });
      setMenuOpen(false);
    };

    return (
      <FormControl fullWidth={fullWidth}>
        <InputLabel style={{ fontSize: "0.8rem", lineHeight: "3.4375em" }}>
          {placeholder}
        </InputLabel>
        <Select
          label={placeholder}
          fullWidth={fullWidth}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onOpen={() => setMenuOpen(true)}
          value={value.value}
          onChange={(e) => onChange(e)}
          className={className}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,

                maxWidth: 200,
              },
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              value={option.value}
              key={index}
              onClick={() => handleItemClick(index)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {menuOpen && (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={options.length}
                itemSize={itemSize}
                width={Math.min(width, fullWidth)}
              >
                {memo(({ index, style }) => (
                  <MenuItem
                    style={{
                      ...style,
                      fontSize: "0.8rem",
                    }}
                    value={options[index].value}
                    key={index}
                    onClick={() => handleItemClick(index)}
                  >
                    {options[index].label}
                  </MenuItem>
                ))}
              </List>
            )}
          </AutoSizer>
        )}
      </FormControl>
    );
  },
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.options.length === nextProps.options.length
);

export default VirtualizedSelect;
