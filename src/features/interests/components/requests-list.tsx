"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X, Clock, ArrowRight } from "lucide-react";
import { getReceivedInterests, getSentInterests, updateInterestStatus } from "../actions/interest-actions";
import { InterestWithProfile, InterestStatus } from "../types/interest.types";
import { toast } from "sonner";
import Link from "next/link";

export function RequestsList() {
  const [received, setReceived] = useState<InterestWithProfile[]>([]);
  const [sent, setSent] = useState<InterestWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [receivedData, sentData] = await Promise.all([
          getReceivedInterests(),
          getSentInterests()
        ]);
        setReceived(receivedData);
        setSent(sentData);
      } catch (error) {
        console.error("Failed to load requests", error);
        toast.error("Failed to load interest requests");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAction = async (id: string, newStatus: InterestStatus, type: 'received' | 'sent') => {
    try {
      // Optimistic update
      if (type === 'received') {
        setReceived(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
      } else {
        setSent(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
      }

      await updateInterestStatus(id, newStatus);
      toast.success(`Request ${newStatus} successfully`);
    } catch (error: unknown) {
      // Refresh list to revert optimistic update
      const [receivedData, sentData] = await Promise.all([getReceivedInterests(), getSentInterests()]);
      setReceived(receivedData);
      setSent(sentData);
      toast.error(error instanceof Error ? error.message : "Action failed");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-[200px]" />
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <Tabs defaultValue="received" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-2 max-w-[400px]">
        <TabsTrigger value="received">
          Received 
          {received.filter(r => r.status === 'pending').length > 0 && (
            <Badge variant="default" className="ml-2 bg-primary w-5 h-5 flex items-center justify-center p-0 rounded-full">
              {received.filter(r => r.status === 'pending').length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="sent">Sent</TabsTrigger>
      </TabsList>

      <TabsContent value="received" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
        {received.length === 0 ? (
          <EmptyState message="You haven't received any interest requests yet." />
        ) : (
          received.map(req => (
            <RequestCard 
              key={req.id} 
              request={req} 
              type="received" 
              onAction={(status) => handleAction(req.id, status, 'received')} 
            />
          ))
        )}
      </TabsContent>

      <TabsContent value="sent" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
        {sent.length === 0 ? (
          <EmptyState message="You haven't sent any interest requests yet." />
        ) : (
          sent.map(req => (
            <RequestCard 
              key={req.id} 
              request={req} 
              type="sent" 
              onAction={(status) => handleAction(req.id, status, 'sent')} 
            />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}

function RequestCard({ request, type, onAction }: { request: InterestWithProfile, type: 'received' | 'sent', onAction: (status: InterestStatus) => void }) {
  const profile = request.profile;
  const isPending = request.status === 'pending';

  return (
    <Card className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/20">
          <AvatarImage src={profile.avatar_url ? profile.avatar_url.split(',')[0] : ""} />
          <AvatarFallback>{profile.first_name?.[0] || "?"}{profile.last_name?.[0] || ""}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-heading font-semibold text-lg">{profile.first_name} {profile.last_name}</h4>
            <StatusBadge status={request.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {profile.age ? `${profile.age} yrs • ` : ''} 
            {profile.profession || "No profession"} • 
            {profile.location_city || "No location"}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            {new Date(request.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="w-full sm:w-auto flex flex-row sm:flex-col gap-2 mt-4 sm:mt-0">
          {type === 'received' && isPending && (
            <>
              <Button size="sm" onClick={() => onAction('accepted')} className="flex-1 sm:flex-none">
                <Check className="mr-2 h-4 w-4" /> Accept
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAction('rejected')} className="flex-1 sm:flex-none">
                <X className="mr-2 h-4 w-4" /> Decline
              </Button>
            </>
          )}

          {type === 'sent' && isPending && (
            <Button size="sm" variant="outline" onClick={() => onAction('cancelled')} className="w-full sm:w-auto text-destructive hover:text-destructive">
              Cancel Request
            </Button>
          )}

          {request.status === 'accepted' && (
            <Link 
              href={`/messages/${profile.id}`} 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 px-3 w-full sm:w-auto"
            >
              Message <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: InterestStatus }) {
  switch (status) {
    case 'accepted':
      return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 shadow-none">Accepted</Badge>;
    case 'rejected':
      return <Badge variant="secondary" className="text-muted-foreground shadow-none">Declined</Badge>;
    case 'cancelled':
      return <Badge variant="secondary" className="text-muted-foreground shadow-none">Cancelled</Badge>;
    case 'pending':
    default:
      return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 shadow-none"><Clock className="mr-1 h-3 w-3"/> Pending</Badge>;
  }
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 bg-card/30 rounded-2xl border border-border/50 border-dashed">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Clock className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-lg mb-1">No requests</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
