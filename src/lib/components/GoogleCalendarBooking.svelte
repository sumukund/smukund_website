<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { reveal } from '$lib/actions/reveal';

	const embedUrl = env.PUBLIC_GOOGLE_CALENDAR_EMBED_URL ?? '';
	const bookingUrl =
		env.PUBLIC_GOOGLE_CALENDAR_BOOKING_URL ??
		(embedUrl ? embedUrl.replace('?gv=true', '') : '');
</script>

<section class="booking">
	<div class="booking-header" use:reveal>
		<h2>Book a Session</h2>
		<p>
			Select an available time below. Appointments are managed through Google Calendar.
		</p>
	</div>

	{#if embedUrl}
		<div class="calendar-frame" use:reveal={{ delay: 80 }}>
			<iframe
				src={embedUrl}
				title="Book a teaching session"
				frameborder="0"
				loading="lazy"
			></iframe>
		</div>

		{#if bookingUrl}
			<p class="booking-fallback" use:reveal={{ delay: 120 }}>
				Prefer to open in a new tab?
				<a href={bookingUrl} target="_blank" rel="noopener noreferrer">
					View on Google Calendar ↗
				</a>
			</p>
		{/if}
	{:else}
		<div class="calendar-placeholder" use:reveal={{ delay: 80 }}>
			<p>
				Calendar booking is not configured yet. Set
				<code>PUBLIC_GOOGLE_CALENDAR_EMBED_URL</code>
				in your environment to enable embedded scheduling.
			</p>
			<p class="hint">
				In Google Calendar, create an Appointment Schedule, then copy the embed URL
				(it looks like
				<code>https://calendar.google.com/calendar/appointments/schedules/…?gv=true</code>).
			</p>
		</div>
	{/if}
</section>

<style>
	.booking {
		margin-top: 4rem;
		padding-top: 3rem;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
	}

	.booking-header h2 {
		font-family: 'Texturina', serif;
		font-size: 1.75rem;
		font-weight: 400;
		margin: 0 0 0.75rem;
	}

	.booking-header p {
		margin: 0 0 2rem;
		line-height: 1.7;
		color: #444;
		max-width: 620px;
	}

	.calendar-frame {
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.06);
		border-radius: 6px;
		overflow: hidden;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
	}

	.calendar-frame iframe {
		display: block;
		width: 100%;
		min-height: 680px;
		border: 0;
	}

	.booking-fallback {
		margin-top: 1rem;
		font-size: 0.85rem;
		color: #555;
	}

	.booking-fallback a {
		color: #111;
		font-weight: 600;
	}

	.calendar-placeholder {
		background: rgba(0, 0, 0, 0.03);
		border-left: 3px solid #111;
		padding: 1.5rem 1.75rem;
	}

	.calendar-placeholder p {
		margin: 0 0 1rem;
		line-height: 1.7;
		color: #333;
	}

	.calendar-placeholder .hint {
		font-size: 0.9rem;
		color: #555;
	}

	code {
		font-size: 0.82rem;
		background: rgba(255, 255, 255, 0.7);
		padding: 0.1rem 0.35rem;
		border-radius: 3px;
	}

	.email-fallback {
		display: inline-block;
		margin-top: 0.5rem;
		color: #111;
		font-weight: 600;
		text-decoration: none;
	}

	.email-fallback:hover {
		text-decoration: underline;
	}
</style>
