
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Plus, Edit, Trash } from "lucide-react";

export const AdminPaymentMethods = () => {
  const [editingMethod, setEditingMethod] = useState<any>(null);
  const [newMethod, setNewMethod] = useState({
    name: "",
    identifier: "",
    image_url: "",
    is_active: true
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: paymentMethods = [] } = useQuery({
    queryKey: ['admin_payment_methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const createMethodMutation = useMutation({
    mutationFn: async (methodData: any) => {
      const { error } = await supabase
        .from('payment_methods')
        .insert(methodData);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_payment_methods'] });
      setNewMethod({ name: "", identifier: "", image_url: "", is_active: true });
      toast({
        title: "Payment Method Created",
        description: "New payment method has been added successfully",
        className: "bg-slate-800 border-green-500/30 text-white"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create payment method",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
    }
  });

  const updateMethodMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const { error } = await supabase
        .from('payment_methods')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_payment_methods'] });
      setEditingMethod(null);
      toast({
        title: "Payment Method Updated",
        description: "Payment method has been updated successfully",
        className: "bg-slate-800 border-green-500/30 text-white"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update payment method",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
    }
  });

  const deleteMethodMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_payment_methods'] });
      toast({
        title: "Payment Method Deleted",
        description: "Payment method has been removed successfully",
        className: "bg-slate-800 border-green-500/30 text-white"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete payment method",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
    }
  });

  const handleCreateMethod = () => {
    if (!newMethod.name || !newMethod.identifier) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all required fields",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    createMethodMutation.mutate(newMethod);
  };

  const handleUpdateMethod = () => {
    if (!editingMethod?.name || !editingMethod?.identifier) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all required fields",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    updateMethodMutation.mutate({
      id: editingMethod.id,
      data: {
        name: editingMethod.name,
        identifier: editingMethod.identifier,
        image_url: editingMethod.image_url,
        is_active: editingMethod.is_active
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <CreditCard className="h-8 w-8 mr-3" />
          Payment Methods Management
        </h1>
        <p className="text-purple-100">
          Manage payment methods available for deposits and withdrawals.
        </p>
      </div>

      {/* Add New Payment Method */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add New Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Method Name</Label>
              <Input
                value={newMethod.name}
                onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                placeholder="e.g., Binance Pay"
                className="bg-slate-700/50 border-white/20 text-white"
              />
            </div>
            <div>
              <Label>Identifier (Address/ID)</Label>
              <Input
                value={newMethod.identifier}
                onChange={(e) => setNewMethod({ ...newMethod, identifier: e.target.value })}
                placeholder="e.g., wallet address or payment ID"
                className="bg-slate-700/50 border-white/20 text-white"
              />
            </div>
          </div>
          
          <div>
            <Label>Image URL (Optional)</Label>
            <Input
              value={newMethod.image_url}
              onChange={(e) => setNewMethod({ ...newMethod, image_url: e.target.value })}
              placeholder="https://example.com/image.png"
              className="bg-slate-700/50 border-white/20 text-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={newMethod.is_active}
              onCheckedChange={(checked) => setNewMethod({ ...newMethod, is_active: checked })}
            />
            <Label>Active</Label>
          </div>

          <Button
            onClick={handleCreateMethod}
            disabled={createMethodMutation.isPending}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            {createMethodMutation.isPending ? 'Creating...' : 'Add Payment Method'}
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="text-center py-12">
              <CreditCard className="h-16 w-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Payment Methods</h3>
              <p className="text-white/70">Add your first payment method above.</p>
            </CardContent>
          </Card>
        ) : (
          paymentMethods.map((method) => (
            <Card key={method.id} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {method.image_url && (
                        <img 
                          src={method.image_url} 
                          alt={method.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                      )}
                      <h3 className="text-lg font-semibold">{method.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        method.is_active 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {method.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-white/60">Identifier:</span>
                      <div className="font-mono break-all">{method.identifier}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setEditingMethod(method)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-purple-500/30 text-white">
                        <DialogHeader>
                          <DialogTitle>Edit Payment Method</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Method Name</Label>
                            <Input
                              value={editingMethod?.name || ""}
                              onChange={(e) => setEditingMethod({ ...editingMethod, name: e.target.value })}
                              className="bg-slate-700/50 border-white/20 text-white"
                            />
                          </div>
                          
                          <div>
                            <Label>Identifier</Label>
                            <Input
                              value={editingMethod?.identifier || ""}
                              onChange={(e) => setEditingMethod({ ...editingMethod, identifier: e.target.value })}
                              className="bg-slate-700/50 border-white/20 text-white"
                            />
                          </div>

                          <div>
                            <Label>Image URL</Label>
                            <Input
                              value={editingMethod?.image_url || ""}
                              onChange={(e) => setEditingMethod({ ...editingMethod, image_url: e.target.value })}
                              className="bg-slate-700/50 border-white/20 text-white"
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={editingMethod?.is_active || false}
                              onCheckedChange={(checked) => setEditingMethod({ ...editingMethod, is_active: checked })}
                            />
                            <Label>Active</Label>
                          </div>

                          <Button
                            onClick={handleUpdateMethod}
                            disabled={updateMethodMutation.isPending}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                          >
                            {updateMethodMutation.isPending ? 'Updating...' : 'Update Payment Method'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => deleteMethodMutation.mutate(method.id)}
                      disabled={deleteMethodMutation.isPending}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
