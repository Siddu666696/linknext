'use client'

import { Box, Checkbox, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Props {
  defaultValue: string
}
const allOptionsPopupStyle = { maxWidth: 700, overflowX: "auto", display: "flex", gap: 2.5, justifyContent: "flex-start", p: 2.5 }
const scrollbarStyle = {
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        height: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
        background: "#f1f1f1",
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#395987',
        borderRadius: "5px"
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#395987'
    }
};


// export function LocationFilter({ defaultValue }: Props) {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [value, setValue] = useState(defaultValue)

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString())
//     if (value) params.set('location', value)
//     else params.delete('location')
//       const newUrl = `?${params.toString()}`
//     router.replace(newUrl, { scroll: false })
//   }, [value])

//   return (
//     <div>
//       <label className="block text-sm font-medium mb-1">Location</label>
//       <input
//         className="w-full border rounded p-2"
//         type="text"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="e.g., Hyderabad"
//       />
//     </div>
//   )
// }
export const LocationFilter = (props) => {
    const { allFilterOptions, allSearchQueryParameters, handleClose, handleCheckboxLocation, aggregators } = props;

    const locations = allFilterOptions?.location || [];
    const columns = Math.ceil(aggregators?.Location?.buckets.length / 10);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2.5, pt: 2.5, }}>
                <Typography sx={{ fontSize: 16, fontWeight: 600, lineHeight: "18px" }}>Locations</Typography>
                <CloseIcon sx={{}} onClick={handleClose} />
            </Box>
            <Box sx={{ ...allOptionsPopupStyle, ...scrollbarStyle }}
            >
                {[...Array(columns)]?.map((_, columnIndex) => (
                    <Box
                        key={columnIndex}
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            rowGap: 1,
                        }}
                    >
                        {aggregators?.Location?.buckets.slice(columnIndex * 10, (columnIndex + 1) * 10).map((sr) => (
                            <Typography
                                key={sr?.key}
                                sx={{ color: allSearchQueryParameters?.locationFilter?.split(",")?.includes(sr?.key?.toLowerCase()) === true ? "#000000" : "#6F7482", whiteSpace: "nowrap" }}
                            >
                                <Checkbox
                                    sx={{ p: "0 !important", mr: 1, color: "#C7D3E3", "&.Mui-checked": { color: "var(--clr-blue-footer)" } }}
                                    checked={allSearchQueryParameters?.locationFilter?.split(",")?.includes(sr?.key?.toLowerCase()) === true}
                                    onChange={() => handleCheckboxLocation(sr?.key)}
                                    name={sr?.key}
                                />
                                &nbsp;{sr?.key}
                            </Typography>
                        ))}
                    </Box>
                ))}
            </Box>
        </>
    )
};