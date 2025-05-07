"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Card } from "@/components/ui/card"; // Added import

// Mock data - replace with actual data fetching and state management
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  branch: "Branch A" | "Branch B";
  image?: string;
  dataAiHint?: string;
}

const initialInventory: InventoryItem[] = [
  { id: "i1", name: "Espresso Beans", category: "Raw Material", stock: 100, price: 15.00, branch: "Branch A", image: "https://picsum.photos/40/40?random=10", dataAiHint: "coffee beans" },
  { id: "i2", name: "Milk (Gallon)", category: "Dairy", stock: 50, price: 3.50, branch: "Branch A", image: "https://picsum.photos/40/40?random=11", dataAiHint: "milk carton" },
  { id: "i3", name: "Croissants (Box)", category: "Baked Goods", stock: 30, price: 12.00, branch: "Branch B", image: "https://picsum.photos/40/40?random=12", dataAiHint: "food croissant" },
  { id: "i4", name: "Takeaway Cups (100pcs)", category: "Supplies", stock: 200, price: 8.00, branch: "Branch A", image: "https://picsum.photos/40/40?random=13", dataAiHint: "coffee cup" },
  { id: "i5", name: "Espresso Beans", category: "Raw Material", stock: 80, price: 15.00, branch: "Branch B", image: "https://picsum.photos/40/40?random=14", dataAiHint: "coffee beans" },
];

const categories = ["Raw Material", "Dairy", "Baked Goods", "Supplies", "Beverages"];
const branches = ["Branch A", "Branch B"];

export default function InventoryPage() {
  const [inventory, setInventory] = React.useState<InventoryItem[]>(initialInventory);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<InventoryItem | null>(null);
  
  // Form state for dialog
  const [itemName, setItemName] = React.useState("");
  const [itemCategory, setItemCategory] = React.useState("");
  const [itemStock, setItemStock] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState("");
  const [itemBranch, setItemBranch] = React.useState<"Branch A" | "Branch B">("Branch A");

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDialogForItem = (item: InventoryItem | null) => {
    setEditingItem(item);
    if (item) {
      setItemName(item.name);
      setItemCategory(item.category);
      setItemStock(item.stock.toString());
      setItemPrice(item.price.toString());
      setItemBranch(item.branch);
    } else {
      setItemName("");
      setItemCategory("");
      setItemStock("");
      setItemPrice("");
      setItemBranch("Branch A");
    }
    setIsDialogOpen(true);
  };

  const handleSaveItem = () => {
    // Basic validation
    if (!itemName || !itemCategory || !itemStock || !itemPrice) {
      alert("Please fill all fields."); // Replace with proper toast notification
      return;
    }

    const newItem: InventoryItem = {
      id: editingItem ? editingItem.id : `i${Date.now()}`, // Simple ID generation
      name: itemName,
      category: itemCategory,
      stock: parseInt(itemStock, 10),
      price: parseFloat(itemPrice),
      branch: itemBranch,
      image: editingItem?.image || `https://picsum.photos/40/40?random=${Date.now()}`,
      dataAiHint: editingItem?.dataAiHint || "product placeholder"
    };

    if (editingItem) {
      setInventory(inventory.map(i => i.id === editingItem.id ? newItem : i));
    } else {
      setInventory([...inventory, newItem]);
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Inventory Management</h1>
        <Button onClick={() => openDialogForItem(null)}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add Item
        </Button>
      </div>

      <div className="mb-4 flex items-center">
        <Search className="mr-2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card className="shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.image && <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-sm" data-ai-hint={item.dataAiHint} />}
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">{item.stock}</TableCell>
                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.branch}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialogForItem(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" onClick={() => handleDeleteItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredInventory.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No items match your search or inventory is empty.</p>
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update the details of the inventory item." : "Fill in the details for the new inventory item."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={itemName} onChange={(e) => setItemName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select value={itemCategory} onValueChange={setItemCategory}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input id="stock" type="number" value={itemStock} onChange={(e) => setItemStock(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" type="number" step="0.01" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branch" className="text-right">Branch</Label>
               <Select value={itemBranch} onValueChange={(value) => setItemBranch(value as "Branch A" | "Branch B")}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => <SelectItem key={branch} value={branch}>{branch}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveItem}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
