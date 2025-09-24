import React from 'react';
import { ExpenseCategory } from './types';
import { OtherIcon } from './components/icons/OtherIcon';
import { MaterialIcon } from './components/icons/MaterialIcon';
import { EquipmentIcon } from './components/icons/EquipmentIcon';
import { ServiceIcon } from './components/icons/ServiceIcon';
import { SparePartsIcon } from './components/icons/SparePartsIcon';
import { SalaryIcon } from './components/icons/SalaryIcon';
import { StationaryIcon } from './components/icons/StationaryIcon';
import { OfficeEquipmentIcon } from './components/icons/OfficeEquipmentIcon';
import { FoodIcon } from './components/icons/FoodIcon';
import { TransportIcon } from './components/icons/TransportIcon';
import { LabourIcon } from './components/icons/LabourIcon';
import { RentIcon } from './components/icons/RentIcon';

export const CATEGORIES: ExpenseCategory[] = [
  ExpenseCategory.Material,
  ExpenseCategory.Equipment,
  ExpenseCategory.Service,
  ExpenseCategory.SpareParts,
  ExpenseCategory.Salary,
  ExpenseCategory.Stationary,
  ExpenseCategory.OfficeEquipment,
  ExpenseCategory.Food,
  ExpenseCategory.Travel,
  ExpenseCategory.Labour,
  ExpenseCategory.Rent,
  ExpenseCategory.Other,
];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.Material]: '#10b981', // Emerald 500
  [ExpenseCategory.Equipment]: '#3b82f6', // Blue 500
  [ExpenseCategory.Service]: '#a855f7', // Purple 500
  [ExpenseCategory.SpareParts]: '#f97316', // Orange 500
  [ExpenseCategory.Salary]: '#ec4899', // Pink 500
  [ExpenseCategory.Stationary]: '#f59e0b', // Amber 500
  [ExpenseCategory.OfficeEquipment]: '#8b5cf6', // Violet 500
  [ExpenseCategory.Food]: '#ef4444', // Red 500
  [ExpenseCategory.Travel]: '#06b6d4', // Cyan 500
  [ExpenseCategory.Labour]: '#84cc16', // Lime 500
  [ExpenseCategory.Rent]: '#14b8a6', // Teal 500
  [ExpenseCategory.Other]: '#6b7280', // Gray 500
};

// FIX: Updated the component type to allow passing SVG props like `style`.
// The previous type was too restrictive, only allowing `className`, which caused a TypeScript error in ExpenseItem.tsx.
export const CATEGORY_ICONS: Record<ExpenseCategory, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  [ExpenseCategory.Material]: MaterialIcon,
  [ExpenseCategory.Equipment]: EquipmentIcon,
  [ExpenseCategory.Service]: ServiceIcon,
  [ExpenseCategory.SpareParts]: SparePartsIcon,
  [ExpenseCategory.Salary]: SalaryIcon,
  [ExpenseCategory.Stationary]: StationaryIcon,
  [ExpenseCategory.OfficeEquipment]: OfficeEquipmentIcon,
  [ExpenseCategory.Food]: FoodIcon,
  [ExpenseCategory.Travel]: TransportIcon,
  [ExpenseCategory.Labour]: LabourIcon,
  [ExpenseCategory.Rent]: RentIcon,
  [ExpenseCategory.Other]: OtherIcon,
};
