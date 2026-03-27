import { useState } from "react";
import { Popover, Box, Typography, TextField } from "@mui/material";
import { useUpdateCardMutation } from "../../../store/api/cardApiSlice";

const COLORS = [
  "#ef5350", "#ab47bc", "#5c6bc0", "#29b6f6", "#26a69a",
  "#66bb6a", "#d4e157", "#ffa726", "#ff7043", "#8d6e63",
];

const LabelPicker = ({ anchorEl, handleClose, card }) => {
  const [labelText, setLabelText] = useState("");
  const [updateCard] = useUpdateCardMutation();

  const handleAddLabel = async (color) => {
    const newLabel = { text: labelText, color };
    const updatedLabels = [...(card.labels || []), newLabel];
    try {
      await updateCard({ id: card._id, labels: updatedLabels }).unwrap();
      handleClose();
      setLabelText("");
    } catch (err) { console.error("Failed to add label", err); }
  };

  const open = Boolean(anchorEl);

  return (
    <Popover open={open} anchorEl={anchorEl} onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
      <Box sx={{ p: 2, width: 250 }}>
        <Typography variant="subtitle2" fontWeight="bold" align="center" sx={{ mb: 2 }}>
          Labels
        </Typography>
        <TextField fullWidth size="small" placeholder="Label text (optional)"
          value={labelText} onChange={(e) => setLabelText(e.target.value)} sx={{ mb: 2 }} />
        <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
          Select a color:
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
          {COLORS.map((color) => (
            <Box key={color} onClick={() => handleAddLabel(color)}
              sx={{
                bgcolor: color, height: 32, borderRadius: 1,
                cursor: "pointer", transition: "0.2s",
                "&:hover": { opacity: 0.8 },
              }}
            />
          ))}
        </Box>
      </Box>
    </Popover>
  );
};

export default LabelPicker;
