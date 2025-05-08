
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, MinusCircle, Trash2, ShoppingCart, DollarSign } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Mock data - replace with actual data fetching and state management
const productCategories = [
  { id: "coffee", name: "Coffee" },
  { id: "tea", name: "Tea" },
  { id: "pastries", name: "Pastries" },
  { id: "sandwiches", name: "Sandwiches" },
  { id: "all", name: "All Products"},
];

const products = [
  { id: "p1", name: "Espresso", category: "coffee", price: 2.50, stock: 50, image: "https://picsum.photos/100/100?random=1" , dataAiHint: "espresso shot" },
  { id: "p2", name: "Latte", category: "coffee", price: 3.50, stock: 40, image: "https://picsum.photos/100/100?random=2", dataAiHint: "latte art" },
  { id: "p3", name: "Croissant", category: "pastries", price: 2.75, stock: 30, image: "https://picsum.photos/100/100?random=3", dataAiHint: "croissant pastry" },
  { id: "p4", name: "Green Tea", category: "tea", price: 2.25, stock: 60, image: "https://picsum.photos/100/100?random=4", dataAiHint: "green tea" },
  { id: "p5", name: "Turkey Club", category: "sandwiches", price: 6.50, stock: 20, image: "https://picsum.photos/100/100?random=5", dataAiHint: "club sandwich" },
  { id: "p6", name: "Cappuccino", category: "coffee", price: 3.25, stock: 35, image: "https://picsum.photos/100/100?random=6", dataAiHint: "cappuccino coffee" },
  { id: "p7", name: "Muffin", category: "pastries", price: 2.00, stock: 45, image: "https://picsum.photos/100/100?random=7", dataAiHint: "blueberry muffin" },
];

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    dataAiHint?: string;
}

function POSPageContent() {
  const [currentOrder, setCurrentOrder] = React.useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const { toast } = useToast();

  const addToOrder = (product: Product) => {
    const existingItemIndex = currentOrder.findIndex(item => item.productId === product.id);
    if (existingItemIndex > -1) {
      const updatedOrder = [...currentOrder];
      updatedOrder[existingItemIndex].quantity += 1;
      updatedOrder[existingItemIndex].total = updatedOrder[existingItemIndex].quantity * updatedOrder[existingItemIndex].price;
      setCurrentOrder(updatedOrder);
    } else {
      setCurrentOrder([...currentOrder, {
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        total: product.price,
      }]);
    }
    toast({
      title: `${product.name} added to order`,
      description: `1 unit of ${product.name} has been added.`,
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromOrder(productId);
      return;
    }
    setCurrentOrder(currentOrder.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity, total: newQuantity * item.price } : item
    ));
  };

  const removeFromOrder = (productId: string) => {
    const itemToRemove = currentOrder.find(item => item.productId === productId);
    setCurrentOrder(currentOrder.filter(item => item.productId !== productId));
    if (itemToRemove) {
        toast({
            title: `${itemToRemove.name} removed`,
            description: `${itemToRemove.name} has been removed from the order.`,
            variant: "destructive",
        });
    }
  };

  const handlePayment = () => {
    // Placeholder for payment processing logic
    if(currentOrder.length === 0){
        toast({
            title: "Order Empty",
            description: "Cannot proceed to payment with an empty order.",
            variant: "destructive",
        });
        return;
    }
    toast({
      title: "Payment Processing",
      description: `Processing payment for $${total.toFixed(2)}. This is a demo.`,
    });
    // Potentially clear order after successful payment
    // setCurrentOrder([]);
  };

  const subtotal = currentOrder.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.08; // Example 8% tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const filteredProducts = products.filter(p => selectedCategory === "all" || p.category === selectedCategory);

  return (
    <div className="container mx-auto py-8 px-2 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-primary">Point of Sale</h1>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Product Selection Area */}
        <Card className="lg:col-span-2 shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle>Select Products</CardTitle>
            <div className="flex space-x-2 pt-2 overflow-x-auto pb-2">
              {productCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex-shrink-0"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={150}
                        height={150}
                        className="w-full h-32 object-cover"
                        data-ai-hint={product.dataAiHint}
                      />
                      <div className="p-3 flex flex-col flex-grow">
                        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                        <Button
                          size="sm"
                          className="w-full mt-auto" // Changed mt-2 to mt-auto
                          onClick={() => addToOrder(product)}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" /> Add
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
               {filteredProducts.length === 0 && (
                <p className="text-center text-muted-foreground py-10">No products in this category.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Current Order & Payment Area */}
        <Card className="shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6 text-primary" /> Current Order
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 pr-2">
              {currentOrder.length === 0 ? (
                <p className="text-muted-foreground text-center py-10">No items in order.</p>
              ) : (
                <ul className="space-y-3">
                  {currentOrder.map((item) => (
                    <li key={item.productId} className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive/80"
                          onClick={() => removeFromOrder(item.productId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <p className="font-medium text-sm w-16 text-right">${item.total.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>

            {currentOrder.length > 0 && (
              <div className="mt-auto pt-4 border-t">
                <div className="space-y-1 text-sm mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({ (taxRate * 100).toFixed(0) }%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button size="lg" className="w-full"
                  onClick={handlePayment}
                >
                  <DollarSign className="mr-2 h-5 w-5" /> Proceed to Payment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


export default function POSPage() {
  // Apply ProtectedRoute to the entire page content
  return (
     <ProtectedRoute requiredRoles={['Cashier', 'Manager']}>
       <POSPageContent />
     </ProtectedRoute>
  );
}
